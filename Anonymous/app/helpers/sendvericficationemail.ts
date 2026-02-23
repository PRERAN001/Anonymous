import { resend } from "../lib/resend";
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

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Anonoymous ',
      html: VerificationEmail(username, verifycode),
    });

    console.log("dataaa",data
        ,"errorrrrrrr",error
    )
    return {success:true,message:"verification email sent successfully"}
        
    } catch (error) {
        console.log("failed to send email,",error)
        return {success:false,message:"failed to send  email"}
    }
}