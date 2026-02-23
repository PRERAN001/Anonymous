import { Message } from "../model/User"
export interface Apiresonse{
    success:boolean,
    message:string,
    isacceptingmessage?:boolean,
    messages?:Array<Message>
}