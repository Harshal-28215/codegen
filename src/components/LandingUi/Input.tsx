"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { useMyContext } from "@/context/CodeAgeContext"

const FormSchema = z.object({
  message: z.string()
})

export function TextareaForm() {
  const {user} = useMyContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const bodyData = {
      message: data.message,
      role: "user",
      user: user?._id
    }
    const response = await fetch(`/api/workspace`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res = await response.json()
    if (response.ok) {
      router.push(`/Workspace/${res.dataId}`)
    } else {
      console.log(res.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/6 h-[200px] space-y-6 mt-4 relative bg-white/10 p-3 rounded-md">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="h-full">
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none bg-transparent border-none outline-none text-white h-full w-[calc(100%-50px)]"
                  {...field}
                />
              </FormControl>
              <Button className="absolute top-[12px] right-[12px] w-[50px]" type="submit"><ArrowRight /></Button>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
