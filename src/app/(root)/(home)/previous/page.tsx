import CallList from '@/components/meeting/callList/CallList'
import React from 'react'

const PreviousPage = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Previous Page
      </h1>
      <CallList type={"ended"} />
    </div>
  )
}

export default PreviousPage