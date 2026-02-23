import { dbconnect } from "@/app/lib/dbConnection";
import usermodel from "@/app/model/User";
import {z} from "zod"
import { usernamesvalidation } from "@/app/schema/signupschema";

const usernamequerychema=z.object({
    username:usernamesvalidation
})
export async function GET(request:Request){
    try {
        await dbconnect()
        const {searchParams}=new URL(request.url)
        const username1={
            username:searchParams.get("username")||""
        }
        const parsedusername=usernamequerychema.safeParse(username1)
        if(!parsedusername.success)
        {
            const usernameerror=parsedusername.error.format().username?._errors
            return Response.json({
                success:false,
                message:usernameerror? usernameerror[0]:"invalid username"
            })
        }
        const {username}=parsedusername.data
        const existingverifiesuser=await usermodel.findOne({
            username,
            isverified:true
        })
        if(existingverifiesuser){
            return Response.json({
                success:false,
                message:"username already exists"
            })
        }
        return Response.json({
            success:true,
            message:"username is unique"
        })


    } 
    catch (error) {
        console.log("error checkking username",error)
        return Response.json({
            success:false,
            message:"failed to check username uniqueness"
        })
    }
}