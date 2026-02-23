import { dbconnect } from "@/app/lib/dbConnection";
import usermodel from "@/app/model/User";

export async function POST(request:Request){
    try {
        await dbconnect()
        const {username,code}=await request.json()
        
        const user=await usermodel.findOne({
            username,
        })
        
        if(!user){
            return Response.json({
                success:false,
                message:"user not found"
            })
        }
        const valid=user.verifycode===code && user.verifycodeexpiry && user.verifycodeexpiry>new Date()
        
        if(valid){
            
            user.isverified=true
            await user.save()
            return Response.json({
                success:true,
                message:"user verified successfully"

            })
        }

        const iscodeexpried=new Date(user.verifycodeexpiry||"") >new Date()
        if(!iscodeexpried){
            return Response.json({
                success:false,
                message:"verification code expired"
            })
        }
        return Response.json({
            success:false,
            message:"invalid verification code"
        })
    } catch (error) {
        console.log("error verifying user",error)
        return Response.json({
            success:false,
            message:"failed to verify user"
        })
    }
}