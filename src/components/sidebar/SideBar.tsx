"use client"
import { sideBarLinks } from '@/lib/SidebarLinks';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = () => {
    const pathname = usePathname();
    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-100 p-6 pt-28 text-white max-sm:hidden lg:w-[264px] '>
            <div className='flex flex-1 flex-col gap-4'>
                {sideBarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn('flex gap-4 items-center p-4 text-white rounded-lg justify-start', {
                                'bg-blue-500': isActive
                            })}
                        >
                            <i className='text-xl'>{React.createElement(link.imgUrl)}</i>
                            <p className='text-lg  max-lg:hidden'>
                                {link.label}
                            </p>

                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default SideBar