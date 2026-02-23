import {z} from "zod"
export const signinscema=z.object({
    identifier:z.string(),
    password:z.string()
})