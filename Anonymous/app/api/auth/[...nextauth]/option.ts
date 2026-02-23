import { NextAuthOptions } from "next-auth";
import { dbconnect } from "@/app/lib/dbConnection";
import bcrypt from "bcryptjs";
import usermodel from "@/app/model/User";
import CredentialsProvider from "next-auth/providers/credentials";

export const authoptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          await dbconnect();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const userfind = await usermodel.findOne({
            email: credentials.email,
          });
          console.log("userfind", userfind);

          if (!userfind) {
            throw new Error("Invalid credentials");
          }

          if (!userfind.isverified) {
            throw new Error("Please verify your email before logging in");
          }

          const passwordcheck = await bcrypt.compare(
            credentials.password,
            userfind.password
          );

          if (!passwordcheck) {
            throw new Error("Invalid credentials");
          }

          // Return a plain user object (not a Mongoose document) to satisfy NextAuth's User shape
          return {
            id: userfind._id?.toString(),
            _id: userfind._id?.toString(),
            email: userfind.email,
            username: userfind.username,
            isverified: userfind.isverified,
            messages:userfind.messages,
            isacceptingmessage: userfind.isacceptingmessage,

          };
        } catch (error) {
          if (error instanceof Error) {
            throw error;
          }
          throw new Error("Something went wrong");
        }
      },
    }),
    
  ],
  pages:{
    signIn:"/sign-in"
  },
  callbacks:{
    async session({ session, token }) {
      if (session.user) {
        
        session.user.id = token.id as string | undefined;
        session.user._id = token._id as string | undefined;
        session.user.isacceptingmessage = token.isacceptingmessage as boolean | undefined;
        session.user.isverified = token.isverified as boolean | undefined;
        session.user.acceptmessage = token.acceptmessage as string | null | undefined;
        session.user.username = token.username as string | undefined;
      }
      return session
    },
    async jwt({ token, user}) {
      if (user) {
        
        const u = user as unknown as {
          _id?: { toString(): string } | string;
          id?: string;
          username?: string;
          isacceptingmessage?: boolean;
          acceptmessage:string;
          isverified?: boolean;
        };

        const idStr = typeof u._id === "string" ? u._id : u._id?.toString?.();
        token.id = idStr ?? u.id;
        token._id = idStr ?? u.id;
        token.isacceptingmessage = u.isacceptingmessage;
        token.isverified = u.isverified;
        token.username = u.username;
        token.acceptmessage = u.acceptmessage;
      }
      return token
    }
  },
  session:{
    strategy:"jwt"
  }, 
  secret:process.env.NEXTAUTH_SECRET
  
};