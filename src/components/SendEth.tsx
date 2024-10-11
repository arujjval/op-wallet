"use client";

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem'

const SendEth = () => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    const ethAmountRegex = /^\d+(\.\d{1,18})?$/;
    const { sendTransaction } = useSendTransaction();

    const formSchema = z.object({
        address: z
                .string()
                .regex(ethAddressRegex, { message: "Invalid Ethereum address" })
                .max(42, "Address should be 42 characters long"),
        amount: z
                .string()
                .regex(ethAmountRegex, { message: "Invalid ETH amount" }) 
                .refine((val) => !isNaN(parseFloat(val)), 
                        { message: "Amount must be a valid number" }
                    ),
        message: z.string().max(100)
    })
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        address: "",
        amount: "",
        message: ""
        },
    })

    const onSubmit = (data: { address: string, amount: string, message : string }) => {
        const tx = sendTransaction({
            to: `0x${(data.address).split('0x').join('')}`,
            value: parseEther(data.amount),
        });

        console.log(tx)
    }

  return (
    <div className='md:w-[500px] py-10 px-14 rounded-xl text-white border-2 border-[#1E3E62]
     hover:bg-[#0B192C]/20 focus:bg-[#0B192C]/20'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className='font-bold'>Send to</FormLabel>
                    <FormControl>
                    <Input placeholder=" ex. 0x9ae21f3e59886b04ba1494bceb0c5293cf137bfa" {...field} 
                            className='border-[#0B192C] border-2'/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className='font-bold'>Amount</FormLabel>
                    <FormControl>
                    <Input placeholder="0.1" {...field} className='border-[#0B192C] border-2'/>
                    </FormControl>
                    <FormMessage/>
                    <FormDescription>
                        Amount should be in ETH
                    </FormDescription>
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className='font-bold'>Message <p className='inline text-gray-700 font-medium'>(optional)</p></FormLabel>
                    <FormControl>
                    <Input placeholder="ex. have a good day!" {...field} className='border-[#0B192C] border-2'/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit" className='w-full hover:bg-gray-900'>Send ETH</Button>
            </form>
        </Form>
    </div>
  )
}

export default SendEth;