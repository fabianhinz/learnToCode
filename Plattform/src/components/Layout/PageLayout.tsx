import './layout.css'

import { Fade, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

import { GatsbyProps } from '../../model/model'
import Footer from '../Footer'
import Header from '../Header'
import Introduction from '../Introduction/Introduction'
import Main from '../Main'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import Brand from '../Shared/Brand'

interface Props extends Pick<GatsbyProps, 'path'> {
    children: React.ReactNode
}

const useStyles = makeStyles(() => ({
    uiLoadingContainer: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

const PageLayout = ({ children, path }: Props) => {
    const [renderApp, setRenderApp] = useState(false)
    const { authReady } = useFirebaseContext()

    const classes = useStyles()

    return (
        <>
            <Fade in={!authReady} timeout={500} onExited={() => setRenderApp(true)}>
                <div className={classes.uiLoadingContainer}>
                    <Brand variant="h4" />
                </div>
            </Fade>
            <Fade in={renderApp}>
                <div>
                    <Helmet>
                        <title>
                            {path.length === 1
                                ? 'learn2Code'
                                : `learn2Code | ${path.split('/').slice(-1)}`}
                        </title>
                    </Helmet>
                    <Header />
                    <Main>{children}</Main>
                    <Introduction />
                    <Footer />
                </div>
            </Fade>
        </>
    )
}

export default PageLayout
