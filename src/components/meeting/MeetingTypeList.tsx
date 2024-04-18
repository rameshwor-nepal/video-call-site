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
                data:{
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
        if(!values.description){
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

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Start an Instant Meeting'
                className='text-center'
                buttonText='Start Meeting'
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList