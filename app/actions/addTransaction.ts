'use server'
import { auth } from "@clerk/nextjs/server";
import { db } from "@/assets/utility/db";
import { revalidatePath } from "next/cache";


interface TransactionData {

    text: string;
    amount: number;
}

interface TransactionResponse {
    data?: TransactionData;
    error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResponse> {
    const textValue = formData.get('text');
    const amountValue = formData.get('amount');

    if (!textValue || !amountValue) {
        return { error: 'Please provide text and amount' };
    }

    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString());

    const {userId} = auth()
   if(!userId){
       return {error: 'User not found'}
   }
try {
    const transactionData : TransactionData = await db.transaction.create({
        data: {
            text,
            amount,
            userId
        }
    
    })
    revalidatePath('/')

    return { data: transactionData };
    
} catch (error) {
    return { error: 'Error adding transaction' };
}


   
}

export default addTransaction;