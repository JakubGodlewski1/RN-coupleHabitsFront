import {useEffect, useState} from "react";
import {useSignIn} from "@clerk/clerk-expo";
import {Alert} from "react-native";
import {emailValidator, resetPasswordValidator} from "@/validators/authValidators";

export const useResetPasswordWithClerk = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [codeError, setCodeError] = useState('')
    const [generalError, setGeneralError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const updateValue = (type: "code" | "email" | "password", value: string) => {
        switch (type) {
            case "code":
                setCode(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    useEffect(() => {
        if (passwordError || emailError || codeError || generalError) {
            setPasswordError("")
            setEmailError("")
            setCodeError("")
            setGeneralError("")
        }
    }, [email, password, code])

    const {signIn, setActive} = useSignIn()

    // Send the password reset code to the user's email
    async function sendCode() {
        const result = emailValidator.safeParse({email})
        if (!result.success) {
            setEmailError("Provided email is not valid")
            return
        }

        setIsLoading(true)
        await signIn
            ?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            })
            .then((_) => {
                setEmailSent(true)
                setEmailError('')
            })
            .catch((err) => {
                console.error('error', err.errors[0].longMessage)
                setEmailError(err.errors[0].longMessage)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    // Reset the user's password.
    // Upon successful reset, the user will be
    // signed in and redirected to the home page
    async function updatePassword() {
        const result = resetPasswordValidator.safeParse({password, code})
        if (!result.success) {
            const localPasswordError = result.error.format().password?._errors[0]
            const localCodeError = result.error.format().code?._errors[0]
            if (localPasswordError)
                setPasswordError(localPasswordError)
            if (localCodeError)
                setCodeError(localCodeError)
            return
        }

        setIsLoading(true)
        await signIn
            ?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })
            .then((result) => {

                if (result.status === 'complete') {
                    setActive({session: result.createdSessionId})
                    //redirect to dashboard
                } else {
                    Alert.alert("Something went wrong, try again later")
                }
            })
            .catch((err) => {
                setIsLoading(false)
                console.error('error', err.errors)
                err.errors.forEach((error: { code: string, longMessage: string }) => {
                    if (error.code === "form_code_incorrect") {
                        setCodeError(error.longMessage)
                    } else if (error.code.includes("password")) {
                        setPasswordError(error.longMessage)
                    } else {
                        setGeneralError(error.longMessage)
                    }
                })
            })
    }

    return {
        password,
        emailSent,
        isLoading,
        errors: {
            emailError,
            passwordError,
            codeError,
            generalError
        },
        updatePassword,
        sendCode,
        email,
        code,
        updateValue
    }
}