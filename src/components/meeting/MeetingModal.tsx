import React, { ReactNode } from 'react'
import { IconType } from 'react-icons';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface PropsI {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className: string;
    children?: ReactNode;
    handleClick: () => void;
    buttonText?: string;
    image?: string;
    buttonIcon?: IconType;
}

const MeetingModal = ({ isOpen, onClose, title, className, children, image, handleClick, buttonText , buttonIcon}: PropsI) => {
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-100 px-6 py-9 text-white">
                    <div className='flex flex-col gap-6'>
                        {image &&
                            <div className='flex justify-center'>
                                <Image
                                    src={image}
                                    alt='image'
                                    width={72} height={72}
                                />
                            </div>
                        }
                        <h1 className={cn('text-3xl font-bold leading-8', className)}>
                            {title}
                        </h1>
                        {children}
                        <Button className='bg-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onClick={handleClick}
                        >
                            {buttonIcon && (
                                <i className='text-xl pl-3'>
                                    {React.createElement(buttonIcon)}
                                </i>
                            )}
                            {buttonText || 'Schedule Meeting'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MeetingModal