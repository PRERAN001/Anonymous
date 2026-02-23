import { getToken } from "next-auth/jwt";
import { dbconnect } from "@/app/lib/dbConnection";
import usermodel from "@/app/model/User";
import { authoptions } from "../auth/[...nextauth]/option";
import { User } from "next-auth";
export async function POST(request:Request){
    try
    {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        console.log("tokennnnnnnnnnnnnnnnn",token)

    if (!token) {
        return Response.json({
            success: false,
            message: "user not authenticated",
        });
    }
        await dbconnect()
        const user=await usermodel.findById(token._id)
        if(!user){
            return Response.json({
                success:false,
                message:"user not found"
            })
        }
        const {acceptmessage}=await request.json()
        if(typeof acceptmessage!=="boolean"){
            return Response.json({
                success:false,
                message:"acceptmessage must be a boolean"
            })
        }
        const updateduser=await usermodel.findByIdAndUpdate(
            token._id
            ,{
                isacceptingmessage:acceptmessage
            }
            ,{new:true}
        )
        if(!updateduser){
            return Response.json({
                success:false,
                message:"failed to update user"
            })
        }
        return Response.json({
            success:true,
            message:"user updated successfully",
            isacceptingmessage:updateduser.isacceptingmessage
        })
    }catch(error){
        console.log("error updating user",error)
        return Response.json({
            success:false,
            message:"failed to update user"
        })
    }
}

        
export async function GET(request:Request){
    try {
        const session=await getSession({req:request,options:authoptions})
        const userr:User=session?.user as User
        if(!userr){
            return Response.json({
                success:false,
                message:"user not authenticated"
            })
        }
        await dbconnect()
        const user=await usermodel.findById(userr._id)
        if(!user){
            return Response.json({
                success:false,
                message:"user not found"
            })
        }
        return Response.json({
            success:true,
            message:"user fetched successfully",
            isacceptingmessage:user.isacceptingmessage
        })
    
    } catch (error) {
        console.log("error fetching user",error)
        return Response.json({
            success:false,
            message:"failed to fetch user"
        })
    }
}