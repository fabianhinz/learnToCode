import './layout.css'

import React from 'react'
import { Helmet } from 'react-helmet'

import { GatsbyProps } from '../../model/model'
import Header from '../Header'
import Introduction from '../Introduction/Introduction'
import Main from '../Main'

interface Props extends Pick<GatsbyProps, 'path'> {
    children: React.ReactNode
}

const PageLayout = ({ children, path }: Props) => {
    return (
        <>
            <Helmet>
                <title>
                    {path.length === 1 ? 'learn2Code' : `learn2Code | ${path.split('/').slice(-1)}`}
                </title>
            </Helmet>
            <Header />
            <Main>{children}</Main>
            <Introduction />
        </>
    )
}

export default PageLayout
