import {z} from "zod"
export const messageschema=z.object({
    content:z.string().max(500,{message:"mesage cannot be more than 500 characters"})
})