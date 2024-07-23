'use client'
import addTransaction from '@/app/actions/addTransaction'
import React from 'react'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'

const AddTransAction = () => {
const [transactionType, setTransactionType] = useState('expense');
 
const formRef = useRef<HTMLFormElement>(null)
const clientAction = async(formData:FormData) => {
const result = await addTransaction(formData)
if(result.error){
    console.log(result.error)
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
            <label htmlFor="text">
                <input type="text" name='text' placeholder='enter text'/>
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
