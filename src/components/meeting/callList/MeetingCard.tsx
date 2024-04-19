import React from 'react'
import Image from 'next/image'
import { IconType } from 'react-icons';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { avatarImages } from '@/lib/SidebarLinks';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MeetingCardProps {
    title: string;
    date: string;
    icon: IconType;
    isPreviousMeeting?: boolean;
    buttonIcon1?: LucideIcon;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
    return (
        <section className='flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-100 px-5 py-8 xl:max-w-[568px] '>
            <article className='flex flex-col gap-5'>
                <i className='text-3xl'>
                    {React.createElement(icon)}
                </i>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-2xl font-bold'>
                            {title}
                        </h1>
                        <p className='text-base font-normal'>
                            {date}
                        </p>

                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative", {})}>
                <div className="relative flex w-full max-sm:hidden">
                    {avatarImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt="attendees"
                            width={40}
                            height={40}
                            className={cn("rounded-full", { absolute: index > 0 })}
                            style={{ top: 0, left: index * 28 }}
                        />
                    ))}
                    <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-200 bg-dark-200">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleClick} className="rounded bg-blue-500 px-6">
                            {buttonIcon1 && (
                                <i className='text-3xl'>
                                {React.createElement(buttonIcon1)}
                            </i>
                            )}
                            &nbsp; {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast({
                                    title: "Link Copied",
                                });
                            }}
                            className="bg-dark-4 px-6"
                        >
                            {/* <Image
                                src="/icons/copy.svg"
                                alt="feature"
                                width={20}
                                height={20}
                            />
                            &nbsp; */}
                             Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    )
}

export default MeetingCard