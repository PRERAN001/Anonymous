import { getToken } from "next-auth/jwt";
import { dbconnect } from "@/app/lib/dbConnection";
import usermodel from "@/app/model/User";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest){
    
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    console.log("tokennnnnnnnnnnnnnnnn",token)

    if (!token) {
        return Response.json({
            success: false,
            message: "user not authenticated",
        });
    }
   
    type TokenShape = { _id?: string; id?: string; sub?: string; [k: string]: unknown };
    const t = token as TokenShape;
    const userIdStr = t._id ?? t.id ?? t.sub;
    if (!userIdStr) {
        return Response.json({
            success: false,
            message: "user not authenticated",
        });
    }
        await dbconnect()
        const userid=new mongoose.Types.ObjectId(userIdStr)
        console.log("fetch user",userid)
        try {
            const useraggerate=await usermodel.aggregate(
                [
                    {$match:{_id:userid}},
                    {$unwind:"$messages"},
                    {$sort:{'messages.createdAt':-1}},
                    {$group:{_id:'$_id',messages:{$push:'$messages'}}}
                ]
            )
            console.log("userr aggerate",useraggerate)
            if(useraggerate.length===0){
                return Response.json({
                    success:true,
                    messages:[]
                })
            }
            return Response.json({
                success:true,
                messages:useraggerate[0].messages
            })
            
        } catch (error) {
            console.log("error fetching messages",error)
            return Response.json({
                success:false,
                message:"failed to fetch messages"
            })
            
        }
}