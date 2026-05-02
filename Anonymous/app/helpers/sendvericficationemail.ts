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
  from: "ezymail0001@gmail.com",
  to: email,
  subject: "from Anonymous :)",
  body: `<!DOCTYPE html>
<html>
  <body style="font-family: Arial; background:#f4f4f4; padding:20px;">
    <h1 style="color:#4f46e5;"> Anonymous 👾👾</h1>
    <p>Enter this verification code ,share ur profile link to get anaoymous messages have fun @ryzeni7 (Anonymous hahahah) .</p>

    <h1>${verifycode}</h1>
  </body>
</html>`
});

    
    return {success:true,message:"verification email sent successfully"}
        
    } catch (error) {
        console.log("failed to send email,",error)
        return {success:false,message:"failed to send  email"}
    }
}