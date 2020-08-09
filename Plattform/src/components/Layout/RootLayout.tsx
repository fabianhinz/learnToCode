import React, { FC } from 'react'

import FirebaseProvider from '../Provider/FirebaseProvider'
import ProgressProvider from '../Provider/ProgressProvider'

const RootLayout: FC = ({ children }) => (
    <FirebaseProvider>
        <ProgressProvider>{children}</ProgressProvider>
    </FirebaseProvider>
)

export default RootLayout
