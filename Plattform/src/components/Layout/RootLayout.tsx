import React, { FC } from 'react'

import FirebaseProvider from '../Provider/FirebaseProvider'
import ProgressProvider from '../Provider/ProgressProvider'
import RatingProvider from '../Provider/RatingProvider'

const RootLayout: FC = ({ children }) => (
    <FirebaseProvider>
        <ProgressProvider>
            <RatingProvider>{children}</RatingProvider>
        </ProgressProvider>
    </FirebaseProvider>
)

export default RootLayout
