'use client'

import { useEffect, useState } from "react";
import { getAccount } from "@wagmi/core"
import { config } from "@/app/Provider"
import Moralis from 'moralis';
import { formatEther } from 'ethers/utils';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


const ShowTxn = () => {
    const { address, isConnected } = getAccount(config);
    const [ transactions, setTransactions ] = useState<any[]>([]);

    useEffect(() => {
        txn();
    }, [isConnected])
    
    const txn = async() => {
        console.log(address)
        if(isConnected) {
            try {
                if (!Moralis.Core.isStarted) {
                    Moralis.start({
                        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjU1NTM4MThiLWRkOTMtNGJmZC04ZTc2LWRkMjc2ZDkzZTkwMyIsIm9yZ0lkIjoiNDExMjUxIiwidXNlcklkIjoiNDIyNjI2IiwidHlwZUlkIjoiNTM2ZDI2NGUtMmVhOC00MjI5LWE3YWYtZjY4M2EyNWI1YzU2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjg1ODM2MzcsImV4cCI6NDg4NDM0MzYzN30.wAa9VpwYxdrIAFY3mvQeQUl7TSpuHHsQGjE6pvCnIx0",
                    });
                }

                const response = await Moralis.EvmApi.transaction.getWalletTransactions({
                  "chain": "0xaa36a7",
                  "order": "DESC",
                  "address": address as string,
                });
                
                setTransactions(response.raw.result);
                return response.raw.result;
              } catch (e) {
                console.error(e);
              }
        }
        else {
            console.log("First connect your wallet")
        }
    }

    if (!isConnected) {
        return (
            <div className="text-white">
                <h2>Please connect your wallet to view your transactions</h2>
                {/* Optionally add a connect button here */}
            </div>
        );
    }

    return (
    <div className='text-white max-w-full text-s border-2 border-shade2 rounded-xl'>
        <Table>
            <TableCaption>A list of your recent transactions.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px] text-center">from</TableHead>
                <TableHead className="text-center">to</TableHead>
                <TableHead className="text-center">value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="px-2">
                {transactions.slice(0, 5).map((tx: any, index: number) => (
                <TableRow key={tx.hash}>
                    <TableCell className="font-medium">{tx.from_address}</TableCell>
                    <TableCell>{tx.to_address}</TableCell>
                    <TableCell className="text-right">{formatEther(tx.value)} ETH</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    )
}

export default ShowTxn