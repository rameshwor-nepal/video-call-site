"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IoMenuSharp } from 'react-icons/io5'
import Link from 'next/link'
import { sideBarLinks } from '@/lib/SidebarLinks'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNavBar = () => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <i className='text-4xl text-white cursor-pointer'>
                        <IoMenuSharp />
                    </i>
                </SheetTrigger>
                <SheetContent side={'left'} className='border-none bg-dark-100'>
                    <Link href={'/'} className='flex items-center gap-1'>
                        {/* <Image src={''} alt='Logo' width={32} height={32} className='max-sm:size-10' /> */}
                        <p className='text-[26px] font-extrabold text-white'>Yoom</p>
                    </Link>
                    <div className='flex h-[calc(100vh-72px)] text-white flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sideBarLinks.map((link) => {
                                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                                    return (
                                        <SheetClose asChild key={link.label}>
                                            <Link
                                                href={link.route}

                                                className={cn('flex gap-4 items-center p-4 text-white rounded-lg w-full max-w-60', {
                                                    'bg-blue-500': isActive
                                                })}
                                            >
                                                <i className='text-lg'>{React.createElement(link.imgUrl)}</i>
                                                <p className='text-lg'>
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNavBar