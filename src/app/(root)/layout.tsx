import React, { ReactNode } from 'react'
import { StreamVideoProvider } from '../../../streamProvider/StreamClientProvider'

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <StreamVideoProvider>
            <div>
                {children}
            </div>
        </StreamVideoProvider>

    )
}

export default RootLayout