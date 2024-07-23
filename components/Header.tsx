import React from 'react'
import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs'
import { checkUser } from '@/assets/utility/checkUser'

const Header = async() => {
    const user = await checkUser()
  return (
    <div>
      <nav className='navbar'>
        <div className="navbar-container">
        <h2>Expense Tracker</h2>
            <div >
                <SignedOut>
                <SignInButton />
                </SignedOut>
                <SignedIn>
                <UserButton />
                </SignedIn>
                </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
