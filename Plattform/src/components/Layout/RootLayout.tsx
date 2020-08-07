import React, { FC } from 'react'

import FirebaseProvider from '../Provider/FirebaseProvider'
import FirestoreProvider from '../Provider/FirestoreProvider'

const RootLayout: FC = ({ children }) => (
    <FirebaseProvider>
        <FirestoreProvider>{children}</FirestoreProvider>
    </FirebaseProvider>
)

export default RootLayout
