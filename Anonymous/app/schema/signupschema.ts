import {z} from "zod"
export const usernamesvalidation=z.string().min(3,"username must be of atleast two charcters").max(20,"username cannot be more than 20 charcters").regex(/^[a-zA-Z0-9_]+$/,"username should not contain any special characters")

export const signupvalidation=z.object({
    username:usernamesvalidation,
    email:z.email({message:"please enter a valid email address"}),
    password:z.string().min(6,"password must be of atleast 6 charcters").max(8,"password cannot be more than 8 charcters")
})