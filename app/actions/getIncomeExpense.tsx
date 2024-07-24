'use server';
import { db } from '@/assets/utility/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  categoryBreakdown?: Record<string, number>;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    const income = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expense = Math.abs(transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0));

    const categoryBreakdown = transactions.reduce((acc, transaction) => {
      const category = transaction.text;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

    return { income, expense, categoryBreakdown };
    
  } catch (error) {
    return { error: 'Database error' };
  }
}

export default getIncomeExpense;
