import Guest from "@/components/Guest"
import { currentUser } from "@clerk/nextjs/server"
import AddTransAction from "@/components/AddTransAction"
import Balance from "@/components/Balance"
import IncomeExpense from "@/components/IncomeExpense"
import TransactionList from "@/components/TransactionList"
import ClientIncomeExpense from "@/components/ClientIncomeExpense"


const Homepage = async() => {
  const user = await currentUser()

  if (!user) {
    return <Guest />
  }
  return (
    <div>
      <main>
        <h1>Hello {user.firstName}</h1>
        <Balance />
        <IncomeExpense />
        <AddTransAction />
        <TransactionList />
        <ClientIncomeExpense />
      </main>
    </div>
  )
}

export default Homepage
