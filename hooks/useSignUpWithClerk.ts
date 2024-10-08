import {useRouter} from "expo-router";
import {useState} from "react";
import {useSignUp} from "@clerk/clerk-expo";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {codeValidator, signUpValidator} from "@/validators/authValidators";
import {zodResolver} from "@hookform/resolvers/zod";

type SignUpForm = z.infer<typeof signUpValidator>;
type CodeForm = z.infer<typeof codeValidator>
type ClerkParamName = "email_address" | "password" | "code"
type ErrorsThrownByClerk = {
    meta: {
        paramName: ClerkParamName,
    },
    message: string
}[]
type ClerkErrors = {
    email: string | undefined,
    password: string | undefined,
    code: string | undefined,
}

export const useSignUpWithClerk = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {isLoaded, signUp, setActive} = useSignUp()
    const router = useRouter()

    const [clerkErrors, setClerkErrors] = useState<ClerkErrors>({
        email: undefined,
        password: undefined,
        code: undefined
    })

    const assignClerkErrors = (errors: ErrorsThrownByClerk) => {
        const errorMapping: Record<ClerkParamName, keyof ClerkErrors> = {
            code: "code",
            password: "password",
            email_address: "email"
        }
        errors.forEach(err => {
            const field = errorMapping[err.meta.paramName];
            setClerkErrors(p => ({...p, [field]: err.message}));
        });
    }

    const {
        control: controlSignUpForm,
        handleSubmit: handleSignUpFormSubmit,
        formState: {errors: signUpFormErrors},
        watch: watchSignUpForm
    } = useForm<SignUpForm>({resolver: zodResolver(signUpValidator)})

    const {
        control: controlCodeForm,
        handleSubmit: handleCodeSubmit,
        formState: {errors: codeFormErrors},
        watch: watchCodeForm
    } = useForm<CodeForm>({
        resolver: zodResolver(codeValidator),
    })

    const [pendingVerification, setPendingVerification] = useState(false)

    watchSignUpForm((_, {name}) => {
        if (name === "email" || name === "password") {
            setClerkErrors({email: undefined, password: undefined, code: undefined});
        }
    });

    watchCodeForm((_, {name}) => {
        if (name === "code") {
            setClerkErrors({email: undefined, password: undefined, code: undefined});
        }
    });

    const onSignUp = async ({password, email}: SignUpForm) => {
        if (!isLoaded) {
            return
        }

        try {
            await signUp.create({
                emailAddress: email,
                password,
            })

            await signUp.prepareEmailAddressVerification({strategy: 'email_code'})

            setPendingVerification(true)
        } catch (err: any) {
            assignClerkErrors(err.errors)
            console.error(JSON.stringify(err.errors, null, 2))
        }
    }

    const onPressVerify = async ({code}: CodeForm) => {
        if (!isLoaded) {
            return
        }

        setIsLoading(true)

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            })

            if (completeSignUp.status === 'complete') {
                await setActive({session: completeSignUp.createdSessionId})
                router.replace('/(intro)/how-to-play')
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2))
            }
        } catch (err: any) {
            setClerkErrors(p => ({...p, code: err.errors[0].message}))
            console.error(JSON.stringify(err, null, 2))
            setIsLoading(false)
        }
    }

    const onSignUpFormSubmit = handleSignUpFormSubmit(onSignUp)
    const onCodeFormSubmit = handleCodeSubmit(onPressVerify)


    return {
        onSignUpFormSubmit,
        onCodeFormSubmit,
        controlSignUpForm,
        controlCodeForm,
        pendingVerification,
        clerkErrors,
        signUpFormErrors,
        codeFormErrors,
        isLoaded,
        isLoading
    }
}