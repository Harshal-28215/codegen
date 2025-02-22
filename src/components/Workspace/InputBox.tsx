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
import { useParams } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { updatechat } from "@/Utils/UpdataChatFunction"
import { useMyContext } from "@/context/CodeAgeContext"


const FormSchema = z.object({
    message: z.string()
})

function InputBox() {

    const id = useParams().id as string;
    const { setChats } = useMyContext();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const bodyData = {
            message: data.message,
            role: 'user',
        }
        const response = await updatechat(bodyData, id, setChats);
        response && form.reset({ message: "" });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-[150px] w-3/12 space-y-6 mt-4 fixed bottom-1 bg-white/10 rounded-md border border-white/20">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="h-full">
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none bg-transparent border-none outline-none text-white h-full w-[calc(100%-74px)]"
                                    {...field}
                                />
                            </FormControl>
                            <Button className="absolute top-[12px] right-[12px] w-[50px] bg-black" type="submit"><ArrowRight /></Button>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default InputBox
