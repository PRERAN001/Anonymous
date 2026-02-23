"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,Controller } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { toast } from "sonner"
import React, { useState ,useEffect} from 'react'
import { signupvalidation } from "@/app/schema/signupschema"
import { useDebounce } from "@uidotdev/usehooks"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useDebounceCallback } from 'usehooks-ts'
import { Form, FormField } from "@/components/ui/form"

import {
  Field,
  FieldDescription,
  FieldError,
  
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
const page = () => {
  const [username,setusername]=useState('')
  const router=useRouter()
  const [usernamemsg,setusernamemsg]=useState('')
  const [ischeckingusername,setischeckingusername]=useState(false)
  const [issubmitting,setissubmitting]=useState(false)
  const debouncedusername=useDebounceCallback(setusername,500)
  const form=useForm<z.infer<typeof signupvalidation>>({
    resolver:zodResolver(signupvalidation),
    defaultValues:{
        username:"",
        email:"",
        password:"",
    }
  })
  useEffect(()=>{
    const checkusername=async()=>{
      if(username){
        setischeckingusername(true)
        setusernamemsg('')
        try {
          const response =await axios.get(`/api/check-username-unique?username=${username}`)
          setusernamemsg(response.data.message)
        } catch (error) {
          setusernamemsg("failed to check username uniqueness")

        }
        finally{
          setischeckingusername(false)
        }
      }
    }
    checkusername()
  },[username])
  const onsubmit=async(data:z.infer<typeof signupvalidation>)=>{
    setissubmitting(true)
    try {
      const response=await axios.post("/api/sign-up",data)
      if(response.data.success){
        toast.success("signup successful")
      }
      router.replace(`/verify/${data.username}`)
    } catch (error) {
      toast.error("signup failed")
    }
    finally{
      setissubmitting(false)
    }
  }
  return (
  <div className="min-h-screen bg-black flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-2xl p-8 space-y-6">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
        <p className="text-sm text-gray-500">
          Join us and start your journey
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
          
          {/* Username */}
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel>Username</FieldLabel>

                <Input
                  {...field}
                  placeholder="your username"
                  autoComplete="off"
                  className="h-11 rounded-lg border border-gray-300 focus:border-black focus:ring-0 transition-all"
                  onChange={(e) => {
                    field.onChange(e)
                    debouncedusername(e.target.value)
                  }}
                />

                {ischeckingusername && (
                  <p className="text-xs text-gray-500">
                    Checking availability...
                  </p>
                )}

                {usernamemsg && !fieldState.invalid && (
                  <p className="text-xs text-gray-600">
                    {usernamemsg}
                  </p>
                )}

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel>Email</FieldLabel>

                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-lg border border-gray-300 focus:border-black focus:ring-0 transition-all"
                />

                <FieldDescription className="text-xs text-gray-500">
                  We'll send a verification code to this email.
                </FieldDescription>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel>Password</FieldLabel>

                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-lg border border-gray-300 focus:border-black focus:ring-0 transition-all"
                />

                <FieldDescription className="text-xs text-gray-500">
                  Use at least 8 characters.
                </FieldDescription>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Button */}
          <Button
            type="submit"
            disabled={ischeckingusername || issubmitting}
            className="w-full h-11 rounded-lg bg-black text-white hover:bg-gray-800 transition-all"
          >
            {issubmitting ? "Creating account..." : "Sign Up"}
          </Button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-black font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>

        </form>
      </Form>
    </div>
  </div>
)
  
}


export default page
