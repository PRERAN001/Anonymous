import { dbconnect } from "@/app/lib/dbConnection";
import usermodel from "@/app/model/User";
import bcrypt from "bcryptjs";
import { sendverificatioemail } from "@/app/helpers/sendvericficationemail";
import { Apiresonse } from "@/app/types/Apiresponse";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse<Apiresonse>> {
    
    try{
        await dbconnect()
        const {username,email,password}=await request.json()
        
        const existinguser=await usermodel.findOne({username,isverified:true})
        if(existinguser){
            
            return NextResponse.json({success:false,message:"username already exists"},{status:400})
        }
        const verifycode=Math.floor(100000+Math.random()*90000).toString()
        
        const existinguserbyemail=await usermodel.findOne({email})
        
        if(existinguserbyemail){
            if(existinguserbyemail.isverified){
                return NextResponse.json({success:false,message:"email already exists"},{status:400})
            }
            else{
                const hashpassword=await bcrypt.hash(password,10)
                const exipirydate=new Date()
                exipirydate.setHours(exipirydate.getHours()+1)
                existinguserbyemail.password=hashpassword
                existinguserbyemail.verifycode=verifycode
                existinguserbyemail.verifycodeexpiry=exipirydate
                await existinguserbyemail.save()
            }
        }
        else{
            const hashpassword=await bcrypt.hash(password,10)
            const exipirydate=new Date()
            exipirydate.setHours(exipirydate.getHours()+1)
            const newuser= await usermodel.create({
                username,
                email,
                password:hashpassword,
                verifycode,
                verifycodeexpiry:exipirydate,
                isverified:false,
                isacceptingmessage:true,
                messages:[]



            })
            
            await newuser.save()
        }
        const verifyemail=await sendverificatioemail(email,username,verifycode)
        console.log(verifyemail)
        if(!verifyemail.success){
            return NextResponse.json({success:false,message:verifyemail.message},{status:500})
        }
        else{
            return NextResponse.json({success:true,message:"user registered successfully, please check your email for verification code"},{status:201})
        }

    }catch(error){
        console.log("error in sign up",error)
        return NextResponse.json({success:false,message:"failed to sign up"},{status:500})
    }
        
}