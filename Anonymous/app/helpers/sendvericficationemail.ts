import ezymail from "ezymail"
import { VerificationEmail } from "../email/VerificationEmail";

import { Apiresonse } from "@/app/types/Apiresponse";
import { Verification } from "next/dist/lib/metadata/types/metadata-types";
export async function sendverificatioemail(
    email:string,
    username:string,
    verifycode:string

):Promise<Apiresonse>{
    try {
        console.log("send verification emailll",username,email,verifycode)

    ezymail.send({
      from: 'preran248@gmail.com',
      to: email,
      subject: 'Anonoymous ',
      body: `hey ${username} here is your verification code ${verifycode}`,
      
    });

    
    return {success:true,message:"verification email sent successfully"}
        
    } catch (error) {
        console.log("failed to send email,",error)
        return {success:false,message:"failed to send  email"}
    }
}