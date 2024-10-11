'use client';

import erc721 from "@/lib/erc721";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { z } from "zod"
  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm } from "react-hook-form"


const ShowNft = () => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    const [NftAddress, setNftAddress]  = useState<string>('');

    const formSchema = z.object({
        address: z
                .string()
                .regex(ethAddressRegex, { message: "Invalid NFT address" })
                .max(42, "Address should be 42 characters long"),
    })
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        address: "",
        },
    })

    const fetchNft = async(data: { address: string }) => {
    }

    return (
        <div className='max-w-[500px] py-10 px-14 rounded-xl bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-black'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(fetchNft)} className="space-y-8">
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className='font-bold'>Enter NFT Address</FormLabel>
                    <FormControl>
                    <Input placeholder="ex. 0x650b3eec8db49a5559836fcc7036af0cb8e0944f" {...field} 
                            className='border-[#0B192C] border-2'/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit" className='w-full'>Add NFT</Button>
            </form>
        </Form>
    </div>
    )
}

export default ShowNft