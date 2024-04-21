import Link from 'next/link'
import React from 'react'
import MobileNavBar from './MobileNavBar'
import { SignedIn } from '@clerk/nextjs'
import { UserButton } from "@clerk/nextjs";


const NavBar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-dark-100 px-6 py-4 lg:px-10'>
      <Link href={'/'} className='flex items-center gap-1'>
        {/* <Image src={''} alt='Logo' width={32} height={32} className='max-sm:size-10' /> */}
        <p className='text-[26px] tracking-wider font-extrabold text-white max-sm:hidden '>MyMeet</p>
      </Link>

      <div className='flex justify-between gap-5'>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className='max-sm:block hidden'>
          <MobileNavBar />
        </div>
      </div>
    </nav>
  )
}

export default NavBar