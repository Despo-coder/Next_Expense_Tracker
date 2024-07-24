'use server';
import { db } from '@/assets/utility/db';
import { auth } from '@clerk/nextjs/server';

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  categoryBreakdown?: Record<string, number>;
  paymentTypeBreakdown?: Record<string, number>;
  dailySpendBreakdown?: Record<string, number>;
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

    const allPaymentTypes = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Mobile Payment'];

    // Initialize paymentTypeBreakdown with all types set to 0
   // const paymentTypeBreakdown = Object.fromEntries(allPaymentTypes.map(type => [type, 0]));

    let income = 0;
    let expense = 0;
    const categoryBreakdown: Record<string, number> = {};
    const dailySpendBreakdown: Record<string, number> = {};

    // transactions.forEach((transaction) => {
    //   if (transaction.transactionType === 'income') {
    //     income += transaction.amount;
    //   } else {
    //     expense += Math.abs(transaction.amount);
        
    //     // Category breakdown (negative for expenses)
    //     categoryBreakdown[transaction.text] = (categoryBreakdown[transaction.text] || 0) - transaction.amount;
        
    //     // Daily spend breakdown (expenses only)
    //     const date = new Date(transaction.createdAt).toISOString().split('T')[0];
    //     dailySpendBreakdown[date] = (dailySpendBreakdown[date] || 0) + transaction.amount;
    //   }
      
    //   // Update payment type breakdown for all transactions
    //   paymentTypeBreakdown[transaction.paymentType] += Math.abs(transaction.amount);
    // });

    // Convert payment type breakdown to percentages
    
 const paymentTypeBreakdown = Object.fromEntries(allPaymentTypes.map(type => [type, 0]));

transactions.forEach((transaction) => {
  if (transaction.transactionType === 'income') {
    income += transaction.amount;
  } else {
    expense += Math.abs(transaction.amount);
    
    // Category breakdown (negative for expenses)
    categoryBreakdown[transaction.text] = (categoryBreakdown[transaction.text] || 0) - transaction.amount;
    
    // Daily spend breakdown (expenses only)
    const date = new Date(transaction.createdAt).toISOString().split('T')[0];
    dailySpendBreakdown[date] = (dailySpendBreakdown[date] || 0) + transaction.amount;
    
    // Update payment type breakdown for expenses only
    paymentTypeBreakdown[transaction.paymentType] += Math.abs(transaction.amount);
  }
});

// Convert payment type breakdown to percentages (for expenses only)
const totalExpenses = Object.values(paymentTypeBreakdown).reduce((sum, amount) => sum + amount, 0);
for (const type in paymentTypeBreakdown) {
  paymentTypeBreakdown[type] = totalExpenses > 0 ? (paymentTypeBreakdown[type] / totalExpenses) * 100 : 0;
}

    
    
    
    const totalTransactions = Object.values(paymentTypeBreakdown).reduce((sum, amount) => sum + amount, 0);
    for (const type in paymentTypeBreakdown) {
      paymentTypeBreakdown[type] = totalTransactions > 0 ? (paymentTypeBreakdown[type] / totalTransactions) * 100 : 0;
    }

    return { income, expense, categoryBreakdown, paymentTypeBreakdown, dailySpendBreakdown };
    
  } catch (error) {
    return { error: 'Database error' };
  }
}

export default getIncomeExpense;
