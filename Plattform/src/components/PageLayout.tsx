import React from 'react'

import Header from './Header'
import Main from './Main'
import FirebaseProvider from './provider/FirebaseProvider'

interface Props {
    children: React.ReactNode
}

const PageLayout = ({ children }: Props) => {
    return (
        <FirebaseProvider>
            <Header />
            <Main>{children}</Main>
        </FirebaseProvider>
    )
}

export default PageLayout
