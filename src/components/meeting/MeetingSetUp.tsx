"use client"
import { VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetUp = () => {
    const [isMicCamToggle, setIsMicCamToggle] = useState(false)
    const call = useCall();

    if(!call) {
        throw new Error ("Usecall must be used within StreamCall Component")
    }


    useEffect(() => {
        if (isMicCamToggle) {
            call?.camera.disable();
            call?.microphone.disable();
        }
        else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggle, call?.camera, call?.microphone])

    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
            <h1 className='text-2xl font-bold'>
                SetUp
            </h1>
            <VideoPreview />
        </div>
    )
}

export default MeetingSetUp