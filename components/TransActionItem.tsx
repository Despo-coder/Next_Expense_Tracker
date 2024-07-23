'use client';
import { Transaction } from '@/assets/types/Transaction';
import { addCommas } from '@/assets/utility/addCommas';
import { toast } from 'react-toastify';
import deleteTransaction from '@/app/actions/deleteTransactions';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this transaction?'
    );

    if (!confirmed) return;
// console.log("test")
   const { message, error } = await deleteTransaction(transactionId);

    if (error) {
      toast.error(error);
    }

    toast.success(message);
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign}${addCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => handleDeleteTransaction(transaction.id)}
        className='delete-btn'
      >
        x
      </button>
    </li>
  );
};

export default TransactionItem;