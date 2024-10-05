import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInValidator} from "@/validators/authValidators";
import {useState} from "react";
import {isClerkAPIResponseError, useSignIn} from "@clerk/clerk-expo";
import {router} from "expo-router";
import {z} from "zod";
import {ClerkAPIError} from "@clerk/types";

type SignInForm = z.infer<typeof signInValidator>
type ClerkParamName = "email_address" | "password"
type ClerkErrors = {
    email: string | undefined,
    password: string | undefined,
}

export const useSignInWithClerk = () => {
    const [clerkErrors, setClerkErrors] = useState<ClerkErrors>({email: undefined, password: undefined})
    const {control, handleSubmit, watch, formState: {errors}} = useForm<SignInForm>({
        resolver: zodResolver(signInValidator)
    })
    const {isLoaded, signIn, setActive} = useSignIn()

    watch((_, {name}) => {
        if (name === "email" || name === "password") {
            setClerkErrors({email: undefined, password: undefined,});
        }
    });

    const assignClerkErrors = (err: { errors: ClerkAPIError[] }) => {
        const errorMapping: Record<ClerkParamName, keyof ClerkErrors> = {
            password: "password",
            email_address: "email"
        }
        err.errors.forEach(err => {
            if (err.meta?.paramName) {
                const field = errorMapping[err.meta.paramName as ClerkParamName];
                if (field) {
                    setClerkErrors(p => ({...p, [field]: err.message}));
                }
            }
        });
    }

    const onSubmit = async ({email, password}: SignInForm) => {

        if (!isLoaded) {
            return
        }

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({session: signInAttempt.createdSessionId})
                router.push('/')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err: any) {
            if (isClerkAPIResponseError(err)) {
                assignClerkErrors(err)
            }

            console.error(JSON.stringify(err, null, 2))
        }
    }
    const handleSignIn = handleSubmit(onSubmit)

    return {
        control,
        handleSignIn,
        errors,
        clerkErrors
    }
}