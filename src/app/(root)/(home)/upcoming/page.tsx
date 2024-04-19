import CallList from '@/components/meeting/callList/CallList'
import React from 'react'

const UpcomingPage = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'>
        <h1 className='text-3xl font-bold'>
            Upcoming Page
        </h1>
        <CallList type= {"upcomings"}/>
    </div>
  )
}

export default UpcomingPage