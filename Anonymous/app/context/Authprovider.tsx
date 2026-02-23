"use client"
import { SessionProvider } from "next-auth/react"

export default function Authprovider({
  childern 
}:{childern:React.ReactNode}) {
  return (
    <SessionProvider >
      {childern}
    </SessionProvider>
  )
}