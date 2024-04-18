import { cn } from '@/lib/utils';
import React from 'react'
import { IconType } from 'react-icons'

interface PropI {
    icon: IconType;
    title: string;
    description: string;
    handleClick: () => void;
    className: string;
}

const MeetingTypeCard = ({ icon, title, description, handleClick, className }: PropI) => {
    return (
        <>
            <div className={cn('px-4 py-6 flex flex-col justify-between w-full min-h-[260px] xl:max-w-[270px] rounded-[14px] cursor-pointer', className)}
                onClick={handleClick}>
                <div className='flex-center glassmorphism size-12 rounded-[12px]'>
                    <i className='text-3xl'>
                        {React.createElement(icon)}
                    </i>

                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold'>
                        {title}
                    </h1>
                    <p className='text-lg font-normal'>
                        {description}
                    </p>
                </div>

            </div>
        </>
    )
}

export default MeetingTypeCard