import React from 'react'

import Header from '../Header'
import Main from '../Main'

interface Props {
    children: React.ReactNode
}

const PageLayout = ({ children }: Props) => (
    <>
        <Header />
        <Main>{children}</Main>
    </>
)

export default PageLayout
