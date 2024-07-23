import Guest from "@/components/Guest"
import { currentUser } from "@clerk/nextjs/server"
import AddTransAction from "@/components/AddTransAction"
import Balance from "@/components/Balance"

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
        <AddTransAction />
      </main>
    </div>
  )
}

export default Homepage
