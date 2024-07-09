import {z} from "zod"

export const signUpValidator = z.object({
    email: z.string().email("Email format is not valid").min(4, "Email has to be at least 4 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    passwordConfirmation: z.string().min(6, "Password must be at least 6 characters long"),
}).refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"]
})

export const signInValidator = z.object({
    email: z.string().email("Email format is not valid").min(4, "Email has to be at least 4 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

