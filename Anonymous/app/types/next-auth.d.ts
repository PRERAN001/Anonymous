declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      _id?: string | null;
      username?: string | null;
      isacceptingmessage?: boolean | null;
      acceptmessage:string |null|undefined;
      isverified?: boolean | null;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string | null;
    _id?: string | null;
    username?: string | null;
    acceptmessage:string |null;
    isacceptingmessage?: boolean | null;
    isverified?: boolean | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string | null;
    _id?: string | null;
    username?: string | null;
    acceptmessage:string |null;
    isacceptingmessage?: boolean | null;
    isverified?: boolean | null;
  }
}
import "next-auth"
import { DefaultSession } from "next-auth"
declare module 'next-auth'{
    interface User{
        _id?:string,
        isacceptingmsg?:string,
        isverified?:boolean,
        acceptmessage:string,
        username?:string
    }
    interface Session{
        user:{
            _id?:string,
            isacceptingmsg?:string,
            isverified?:boolean,
            acceptmessage:string,
            username?:string
        }& DefaultSession["user"]
    }
    interface JWT{
        _id?:string,
        isacceptingmsg?:boolean,
        isverified?:boolean,
        username?:string
        acceptmessage:string,
    }
}