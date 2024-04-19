"use client"
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import { FaCalendarCheck } from 'react-icons/fa';
import { MdEmergencyRecording } from 'react-icons/md';
import { RiCalendarScheduleFill } from 'react-icons/ri';
import { Play } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PropI {
    type: 'ended' | 'upcomings' | 'recordings'
}

const CallList = ({ type }: PropI) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([])

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcomings':
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No Recordings';
            case 'upcomings':
                return 'No Upcoming calls';
            default:
                return '';
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings())) ?? []
                const recordings = callData.filter(call => call.recordings.length > 0).flatMap(call => call.recordings)

                setRecordings(recordings)
            }
            catch (error) {
                toast({ title: 'Try again later' })
            }
        }
        if (type === 'recordings') fetchRecordings();

    }, [callRecordings, type]);
    if (isLoading) return 'Loading....'
    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (

        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                    key={(meeting as Call).id}
                    icon={
                        type === 'ended'
                            ? FaCalendarCheck
                            : type === 'upcomings'
                                ? RiCalendarScheduleFill
                                : MdEmergencyRecording
                    }
                    title={
                        (meeting as Call).state?.custom?.description ||
                        (meeting as CallRecording).filename?.substring(0, 20) ||
                        'No Description'
                    }
                    date={
                        (meeting as Call).state?.startsAt?.toLocaleString() ||
                        (meeting as CallRecording).start_time?.toLocaleString()
                    }
                    isPreviousMeeting={type === 'ended'}
                    link={
                        type === 'recordings'
                            ? (meeting as CallRecording).url
                            : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                    }
                    buttonIcon1={type === 'recordings' ? Play : undefined}
                    buttonText={type === 'recordings' ? 'Play' : 'Start'}
                    handleClick={
                        type === 'recordings'
                            ? () => router.push(`${(meeting as CallRecording).url}`)
                            : () => router.push(`/meeting/${(meeting as Call).id}`)
                    }
                />
            )) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    )
}

export default CallList