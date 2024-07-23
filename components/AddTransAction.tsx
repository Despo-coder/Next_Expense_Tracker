'use client'
import addTransaction from '@/app/actions/addTransaction'
import React from 'react'
import { toast } from 'react-toastify'
import { useRef } from 'react'

const AddTransAction = () => {
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
            <label htmlFor="text">
                <input type="text" name='text' placeholder='enter text'/>
            </label>
        </div>
        <div className="form-control">
            <label htmlFor="amount"><br/>(- is expense. + is income)
                <input type="number" name='amount' placeholder='enter amount' step='0.01'/>
            </label>
        </div>
        <button>Add Transaction</button>
      </form>
    </div>
  )
}

export default AddTransAction
