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
import { Form, FormField } from "@/components/ui/form"

import {
  Field,
  FieldDescription,
  FieldError,
  
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signinscema } from "@/app/schema/signinscheama"
import { signIn } from "next-auth/react"
const page = () => {
  
  const router=useRouter()
  
  
  
  const [issubmitting,setissubmitting]=useState(false)
  
  const form=useForm<z.infer<typeof signinscema>>({
    resolver:zodResolver(signinscema),
    defaultValues:{
        
        identifier:"",
        password:"",
    }
  })
 
  const onsubmit=async(data:z.infer<typeof signinscema>)=>{
    setissubmitting(true)
    await signIn("credentials",{
      email:data.identifier,
      password:data.password,
      redirect:false
    }).then((res)=>{
      if(res?.error){
        toast.error(res.error)
      }
      else{
        toast.success("signed in successfully")
        router.replace("/")
      }
    }).catch((error)=>{
      toast.error("sign in failed")
    }).finally(()=>{
      setissubmitting(false)
    })

  }
 return (
  <div className="min-h-screen flex items-center justify-center bg-black px-4">
    
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
      
      <h2 className="text-3xl font-bold text-white text-center mb-2">
        Welcome Back
      </h2>
      <p className="text-zinc-400 text-center mb-6">
        Sign in to continue
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
          
          {/* EMAIL */}
          <Controller
            name="identifier"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-zinc-300">
                  Email
                </FieldLabel>

                <Input
                  {...field}
                  placeholder="you@example.com"
                  className="bg-black/40 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-white/20"
                  aria-invalid={fieldState.invalid}
                />

                <FieldDescription className="text-zinc-500">
                  Enter your registered email
                </FieldDescription>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* PASSWORD */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-zinc-300">
                  Password
                </FieldLabel>

                <Input
                  {...field}
                  type="password"
                  placeholder="********"
                  className="bg-black/40 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-white/20"
                  aria-invalid={fieldState.invalid}
                />

                <FieldDescription className="text-zinc-500">
                  Enter your password
                </FieldDescription>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            disabled={issubmitting}
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200 transition-all duration-200 font-semibold"
          >
            {issubmitting ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-center text-sm text-zinc-500 mt-4">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-white hover:underline">
              Sign Up
            </Link>
          </p>

        </form>
      </Form>

    </div>
  </div>
)
}


export default page
