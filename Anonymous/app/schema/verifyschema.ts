import {z} from "zod"
export const verifycodeschema=z.object({
    code:z.string().length(6,"")
})