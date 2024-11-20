import {z} from "zod"

export const signUpValidator = z.object({
    email: z.string({required_error: "Email is required"}).email("Email format is not valid").min(4, "Email has to be at least 4 characters long"),
    password: z.string({required_error: "Password is required"}).min(8, "Password must be at least 8 characters long"),
    passwordConfirmation: z.string({required_error: "Password confirmation is required"}).min(8, "Password must be at least 8 characters long"),
}).refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"]
})

export const signInValidator = z.object({
    email: z.string({required_error: "Email is required"}).email("Email format is not valid").min(4, "Email has to be at least 4 characters long"),
    password: z.string({required_error: "Password is required"}).min(8, "Password must be at least 8 characters long"),
})


export const codeValidator = z.object({
    code: z.string({required_error: "Code is required"})
        .min(6, "The code should be 6 characters long")
        .max(6, "The code should be 6 characters long")
})

export const emailValidator = z.object({
    email: z.string({required_error: "Email is required"}).email("You did not provide valid email")
})

export const resetPasswordValidator = z.object({
    password: z.string({required_error: "Password is required"}).min(8, "Password must be at least 8 characters long"),
    code: z.string({required_error: "Code is required"}).min(6, "The code should be 6 characters long").max(6, "The code should be 6 characters long")
})