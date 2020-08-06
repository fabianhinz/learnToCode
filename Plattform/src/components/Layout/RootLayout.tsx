import React, { FC } from 'react'

import FirebaseProvider from '../Provider/FirebaseProvider'

const RootLayout: FC = ({ children }) => <FirebaseProvider>{children}</FirebaseProvider>

export default RootLayout
