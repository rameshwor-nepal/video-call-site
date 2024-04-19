"use client"
import React, { useState } from 'react'
import MeetingTypeCard from './MeetingTypeCard'
import { FaPlus, FaRegCalendarPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { MdEmergencyRecording, MdOutlinePersonAddAlt } from 'react-icons/md'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from '../ui/textarea'
import ReactDatePicker from 'react-datepicker'

const MeetingTypeList = () => {
    const { toast } = useToast()
    const router = useRouter();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const { user } = useUser();
    const client = useStreamVideoClient();

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error("Failed to create call")

            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call)
            toast({
                title: "Meeting has been scheduled successfully",
            })
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
        }
        catch (error) {
            console.log(error)
            toast({
                title: "Error Occured !!",
            })
        }
    }
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
            <MeetingTypeCard
                icon={FaPlus}
                title='New Meeting'
                description='Start an Instant Meeting'
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-orange-1'
            />
            <MeetingTypeCard
                icon={FaRegCalendarPlus}
                title='Schedule Meeting'
                description='Plan Your Meeting'
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className='bg-blue-500'
            />

            <MeetingTypeCard
                icon={MdOutlinePersonAddAlt}
                title='Join Meeting'
                description='Click to join your meeting'
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className='bg-yellow-1'
            />
            <MeetingTypeCard
                icon={MdEmergencyRecording}
                title='View Recording'
                description='Review Your Recordings'
                handleClick={() => router.push('/recordings')}
                className='bg-purple-1'
            />


            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Create Meeting'
                    handleClick={createMeeting}
                >
                    <div className='flex flex-col gap-2'>
                        <label className='text-base font-normal leading-[20px] text-sky-1 '>
                            Add a description
                        </label>
                        <Textarea
                            className='border-none bg-dark-200 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => {
                                setValues({ ...values, description: e.target.value })
                            }}
                        />
                        <div className='flex w-full flex-col gap-2'>
                            <label className='text-base font-normal leading-[20px] text-sky-1 '>
                                Select Date and Time
                            </label>
                            <ReactDatePicker
                                selected={values.dateTime}
                                onChange={(date) => setValues({ ...values, dateTime: date! })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMM d, yyy h:mm aa"
                                className='w-full rounded bg-dark-200 p-2 focus:outline-none'
                            />
                        </div>

                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Meeting Created'
                    className='text-center'
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: 'Link Copied' })
                    }}
                    // image=''
                    // buttonIcon={}
                    buttonText='Copy Meeting Link'
                />
            )}
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Start an Instant Meeting'
                className='text-center'
                buttonText='Start Meeting'
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Type the link here'
                className='text-center'
                buttonText='Join Meeting'
                handleClick={() => router.push(values.link)}
            >
                <input type="text"
                    placeholder='Meeting link'
                    className='border-none bg-dark-200 focus-visible:ring-0 focus-visible:ring-offset-0'
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                />
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList