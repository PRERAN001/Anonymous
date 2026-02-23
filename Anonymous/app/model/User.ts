import mongoose, { Schema } from "mongoose"
import { Document } from "mongoose";

export interface Message extends Document{
    content:string,
    createdat:Date
}

const MessageSchema:Schema<Message>=new Schema({
    content:{type:String,required:true},
    createdat:{type:Date,default:Date.now}
})

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifycode:string,
    verifycodeexpiry:Date,
    messages:Message[],
    isacceptingmessage:boolean,
    isverified:boolean;
}

const Userschema :Schema<User>=new Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true,match:[/.+\@.+\..+/,"please enter valid email address"]},
    password:{type:String,required:true},
    verifycode:{type:String},
    verifycodeexpiry:{type:Date},
    messages:[MessageSchema],
    isacceptingmessage:{type:Boolean,default:false},
    isverified:{type:Boolean,default:false}

})

const usermodel=mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",Userschema)
export default usermodel