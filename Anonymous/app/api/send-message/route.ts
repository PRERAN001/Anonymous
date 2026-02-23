import usermodel from "@/app/model/User";
import { dbconnect } from "@/app/lib/dbConnection";
import { Message } from "@/app/model/User";

export async function POST(request:Request){
    await dbconnect()
    const {username,content}=await request.json()
    console.log("contenttt",username,content)
    try {
        const user=await usermodel.findOne({
            username
        })
        if(!user){
            return Response.json({
                success:false,
                message:"user not found"
            })
        }
        if(user.isacceptingmessage){
            const newmessage={
                content,
                createdat:new Date()
            }
            user.messages.push(newmessage as Message)
            await user.save()
            return Response.json({
                success:true,
                message:"message sent successfully"
            })
        }
        return Response.json({
            success:false,
            message:"user is not accepting messages"
        })

                
    } catch (error) {
        
    }
}