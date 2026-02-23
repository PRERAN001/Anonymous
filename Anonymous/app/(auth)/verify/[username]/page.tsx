"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,Controller } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { toast } from "sonner"
import React, { useState ,useEffect} from 'react'
import axios from "axios"
import { verifycodeschema } from "@/app/schema/verifyschema"
import { useParams, useRouter } from "next/navigation"
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
  console.log("verify routeeeeeeeeeeeeeeeeeeeeeeee")
    const params=useParams<{username:string}>()
    const router=useRouter()
    const form=useForm<z.infer<typeof verifycodeschema>>({
        resolver:zodResolver(verifycodeschema),
        defaultValues: {
        code: ""
      }
        
      })
      const onsubmit=async(data:z.infer<typeof verifycodeschema>)=>{
        try {
            const response=await axios.post("/api/verify",{
                username:params.username,
                code:data.code

            })
            if(response.data.success){
                toast.success(response.data.message)
                router.replace("/sign-in")
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log("error",error)
            toast.error("verification failed")
        }
        }


  return (
  <div className="min-h-screen bg-black flex items-center justify-center px-4">
    
    <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-2xl p-8 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Verify Account
        </h1>
        <p className="text-sm text-gray-500">
          Enter the verification code sent to your email
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">

          <Controller
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                
                <FieldLabel>Verification Code</FieldLabel>

                <Input
                  {...field}
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="••••••"
                  className="h-12 text-center tracking-widest text-lg rounded-xl border border-gray-300 focus:border-black focus:ring-0 transition-all"
                />

                <FieldDescription className="text-xs text-gray-500">
                  The code usually expires in 5 minutes.
                </FieldDescription>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full h-12 rounded-xl bg-black text-white hover:bg-zinc-800 transition-all font-medium"
          >
            {form.formState.isSubmitting ? "Verifying..." : "Verify"}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Wrong email?{" "}
            <Link
              href="/sign-up"
              className="text-black font-medium hover:underline"
            >
              Go back
            </Link>
          </p>

        </form>
      </Form>
    </div>
  </div>
)
}

export default page

