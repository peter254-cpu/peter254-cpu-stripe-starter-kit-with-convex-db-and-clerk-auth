import Link from 'next/link'
import React from 'react'
import { BookOpenIcon, CreditCardIcon, GraduationCap, LockIcon, LogInIcon, LogOutIcon, Zap } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className='w-full flex  flex-wrap justify-between items-center py-4 px-6 bg-background border-b'>
        <Link href={"/"} className='text-xl font-extrabold text-primary flex items-center gap-2'>
            <span className='text-left sm:text-center md:text-left'>CourseHub</span>
            <GraduationCap className="size-6 hidden md:inline xl:inline" />
        </Link>
        <div className='flex items-center space-x-1 sm:space-x-4 '>
            <Link 
                className='flex items-center gap-1 px-3 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors'
                href={"/courses"}>
                <BookOpenIcon className='siz-6' />
                <span className='text-xsm font-sm hidden md:inline'>Courses</span>
            </Link>
            <Link 
                className='flex items-center gap-1 px-3 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors'
                href={"/pro"}>
                <Zap className='siz-6' />
                <span className='text-xsm font-sm hidden md:inline'>Pro</span>
            </Link>

            {/* Look how easy it is to handle authorization and authentication using clerk */}
            <SignedIn>
                <Link href={"/billing"}>
                    <Button variant={"outline"} size={"sm"} className='flex items-center gap-2'>
                        <CreditCardIcon className="size-4"  />
                        <span className='hidden md:inline'>Billing</span>
                    </Button>
                </Link>
            </SignedIn>

            {/* this is only shown for logged in user */}
            <UserButton />

            <SignedIn>
                <SignOutButton>
                    <Button variant="outline" size="sm" className='hidden sm:flex items-center gap-2'>
                        <LogOutIcon className='size-4' />
                        <span className='hidden md:inline'>Log Out</span>
                    </Button>
                </SignOutButton>
            </SignedIn>
            
            <SignedOut>
                <SignInButton mode="modal">
                    <Button variant="outline" size="sm">
                        <LockIcon className='size-4' />
                        <span className='text-sm'>Log In</span>
                    </Button>
                </SignInButton>
            </SignedOut>

            <SignedOut>
                <SignUpButton mode='modal'>
                    <Button variant={"outline"} size="sm">
                        <LogInIcon className='size-4' />
                        <span className='text-sm'>Sign Up</span>
                    </Button>
                </SignUpButton>
            </SignedOut>

        </div>
    </div>
  )
}

export default Navbar