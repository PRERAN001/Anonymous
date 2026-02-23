"use client"
import { Message } from '@/app/model/User'
import { acceptmessageschema } from '@/app/schema/acceptmessageschema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Loader2, Copy, RefreshCw } from "lucide-react"

const page = () => {
    
    const [messages,setmessages]=useState<Message[]>([])
    const [loading,setloading]=useState(false)
    const [iswitchloading,setisswitchloading]=useState(false)

    
    const {data:session}=useSession()
    
    const form=useForm(
        {
            resolver:zodResolver(acceptmessageschema),
            defaultValues:{
                acceptmsg:false
            }
        }
    )
    const {register,watch,setValue}=form
    const acceptmsg=watch('acceptmsg')
    const fetchacceprmsg=useCallback(async()=>{
        setisswitchloading(true)
        try {
            const response=await axios.get("/api/accept-message")
            
            setValue("acceptmsg",response.data.isacceptingmessage)
            
        } catch (error) {
            console.log("error fetching accept messages",error)
        }
        finally{
            setisswitchloading(false)
        }

    },[setValue])

    const fetchmessages=useCallback(async()=>{
        setloading(true)
        setisswitchloading(false)
        try {
            const response=await axios.get("/api/get-messages")
            

            setmessages(response.data.messages)
        } catch (error) {
            console.log("error fetching messages",error)
        }
        finally{
            setloading(false)
        }

    },[setloading,setmessages])

    useEffect(()=>{
        if(session){
            fetchacceprmsg()
            fetchmessages()
        }
    },[session,fetchacceprmsg,fetchmessages])
     const handelswitchange=async()=>{
        try {
            const response=await axios.post("/api/accept-message",{
                acceptmessage:!acceptmsg
            })
            console.log("watcherrr",response.data)
            if(response.data.success){
                setValue("acceptmsg",response.data.isacceptingmessage)
            }
        }
        catch(error){
            console.log("error updating accept message",error)
        }
     }

     const username = session?.user?.username ?? ''
     const baseurl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''
     const profileurl = username ? `${baseurl}/u-anonymous/${username}` : `${baseurl}/u-annonymous/`
     const copytoclipboard = () => {
        if (!username) {
          toast.error('No profile URL available — please sign in')
          return
        }
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(profileurl)
          toast.success("profile url copied to clipboard")
        } else {
          toast.error('Clipboard not available')
        }

     }
 return (
  <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-black">
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-16">
        <h1 className="text-5xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-black/50 mt-3 text-lg">
          Control your anonymous message space.
        </p>
      </div>

      {/* Top Section Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-14">

        {/* Profile Link */}
        <Card className="border border-black/10 bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Your Unique Link
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-black text-white rounded-xl px-4 py-3 text-sm break-all">
              {username
                ? profileurl
                : "Sign in to generate your profile link"}
            </div>

            <Button
              onClick={copytoclipboard}
              disabled={!username}
              className="w-full bg-black text-white hover:bg-black/80 rounded-xl h-11 transition-all"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </CardContent>
        </Card>

        {/* Accept Messages */}
        <Card className="border border-black/10 bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
          <CardContent className="py-8 flex flex-col justify-between h-full">

            <div>
              <p className="text-lg font-semibold mb-1">
                Accept Messages
              </p>
              <p className="text-black/50 text-sm">
                Toggle whether people can send you messages.
              </p>
            </div>

            <div className="flex items-center justify-between mt-8">
              <Switch
                checked={acceptmsg}
                onCheckedChange={handelswitchange}
                disabled={iswitchloading}
                className="data-[state=checked]:bg-black scale-110"
              />

              {iswitchloading && (
                <Loader2 className="h-5 w-5 animate-spin text-black/60" />
              )}
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Messages Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold">
          Messages
        </h2>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchmessages}
          className="border-black/20 hover:bg-black hover:text-white transition"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      Messages Section
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="border border-dashed border-black/20 rounded-2xl p-20 text-center">
          <p className="text-xl font-medium mb-2">
            No messages yet
          </p>
          <p className="text-black/50">
            Share your link and start receiving anonymous feedback.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {messages.map((msg,i) => (
            <Card
              key={i}
              className="group relative border border-black/10 bg-white hover:border-black hover:shadow-2xl transition-all duration-300 rounded-2xl"
            >
              <CardContent className="p-8 space-y-6">

                <p className="text-lg leading-relaxed font-medium">
                  {msg.content}
                </p>

                <p className="text-xs text-black/40">
                  {new Date(msg.createdat).toLocaleString()}
                </p>

                

              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  </div>
)
}

export default page
