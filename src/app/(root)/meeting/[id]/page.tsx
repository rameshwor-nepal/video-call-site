"use client"
import MeetingRoom from '@/components/meeting/MeetingRoom';
import MeetingSetUp from '@/components/meeting/MeetingSetUp';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

const MeetingPage = ({ params }: { params: { id: string } }) => {
  const {user, isLoaded} = useUser();
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);
  const {call, callLoading} = useGetCallById(params.id)

  if(!isLoaded || callLoading) return 'Loading......'
  return (
    <main className='h-full w-full'>
      <StreamCall call={call}>
        <StreamTheme >
            {!isSetUpComplete ? (
              <MeetingSetUp setIsSetUpComplete = {setIsSetUpComplete}/>
            ) : (
              <MeetingRoom />
            )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default MeetingPage