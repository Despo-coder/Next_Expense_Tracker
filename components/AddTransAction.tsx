'use client'
import addTransaction from '@/app/actions/addTransaction'
import React from 'react'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'

const AddTransAction = () => {
const [transactionType, setTransactionType] = useState('expense');

const paymentTypes = [
  'Cash', 
  'Credit Card', 
  'Debit Card', 
  'Bank Transfer', 
  'Mobile Payment'
];
const predefinedExpenses = [
  'Transportation',
  'Food',
  'Housing',
  'Utilities',
  'Insurance',
  'Healthcare',
  'Savings',
  'Personal',
  'Entertainment',
  'Other'
];

 
const formRef = useRef<HTMLFormElement>(null)

const clientAction = async(formData:FormData) => {
const result = await addTransaction(formData)
if(result.error){
   toast.error(result.error)
    }else{
toast.success('Transaction Added')
formRef.current?.reset()
    }
}

  return (
    <div>
      <h3>Add Transaction</h3>
      <form ref={formRef} action={clientAction}>
      <div className="form-control">
  <label htmlFor="transactionType">Transaction Type</label>
  <select 
    name="transactionType" 
    value={transactionType} 
    onChange={(e) => setTransactionType(e.target.value)}
  >
    <option value="expense">Expense</option>
    <option value="income">Income</option>
  </select>
</div>

<div className="form-control">
  <label htmlFor="text">Category
    <select name="text">
      {predefinedExpenses.map((expense) => (
        <option key={expense} value={expense}>{expense}</option>
      ))}
    </select>
  </label>
</div>

<div className="form-control">
  <label htmlFor="paymentType">Payment Type
    <select name="paymentType">
      {paymentTypes.map((type) => (
        <option key={type} value={type}>{type}</option>
      ))}
    </select>
  </label>
</div>



        <div className="form-control">
  <label htmlFor="amount">Amount
    <input 
      type="number" 
      name='amount' 
      placeholder='enter amount' 
      step='0.01'
      onChange={(e) => {
        const value = e.target.value;
        e.target.value = transactionType === 'expense' ? `-${Math.abs(parseFloat(value))}` : `${Math.abs(parseFloat(value))}`;
      }}
    />
  </label>
</div>

        <button>Add Transaction</button>
      </form>
    </div>
  )
}

export default AddTransAction
