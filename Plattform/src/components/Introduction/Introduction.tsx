import { Box, IconButton, Snackbar } from '@material-ui/core'
import { blue, green, red } from '@material-ui/core/colors'
import { Check, Close, Help } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import React, { useEffect, useState } from 'react'

import { FirestoreUserDoc } from '../../model/firebase'
import { useFirebaseContext } from '../Provider/FirebaseProvider'

const Introduction = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(() => {
        const prevIntroduction = localStorage.getItem('introduction')
        if (prevIntroduction === null) return true
        else return JSON.parse(prevIntroduction)
    })
    const [carouselOpen, setCarouselOpen] = useState(false)
    const { firebaseInstance, resolveUser } = useFirebaseContext()

    useEffect(() => {
        resolveUser.then(user => {
            if (user.introduction !== undefined) setSnackbarOpen(user.introduction)
        })
    }, [resolveUser])

    const handleCheckClick = () => {
        setSnackbarOpen(false)
        setCarouselOpen(true)
    }

    const saveDecision = async () => {
        resolveUser.then(
            user => {
                firebaseInstance
                    .firestore()
                    .doc(`users/${user.uid}`)
                    .set(
                        {
                            introduction: false,
                        } as Pick<FirestoreUserDoc, 'introduction'>,
                        { merge: true }
                    )
            },
            _noUser => {
                localStorage.setItem('introduction', 'false')
            }
        )
    }

    const handleDenyClick = () => {
        setSnackbarOpen(false)
        saveDecision()
    }

    const handleStartClick = () => {
        setCarouselOpen(false)
        saveDecision()
    }

    return (
        <>
            <Snackbar open={snackbarOpen}>
                <Alert
                    elevation={6}
                    icon={<Help />}
                    severity="info"
                    action={
                        <>
                            <Box mr={1}>
                                <IconButton size="small" color="inherit" onClick={handleCheckClick}>
                                    <Check />
                                </IconButton>
                            </Box>
                            <IconButton size="small" color="inherit" onClick={handleDenyClick}>
                                <Close />
                            </IconButton>
                        </>
                    }>
                    <AlertTitle>Willkommen</AlertTitle>
                    Erhalte eine kurze Einführung in die Lernplattform
                </Alert>
            </Snackbar>

            <AutoRotatingCarousel
                label="Get started"
                open={carouselOpen}
                onClose={() => setCarouselOpen(false)}
                onStart={handleStartClick}
                autoplay={false}
                style={{ position: 'absolute' }}>
                <Slide
                    media={
                        <img
                            alt=""
                            src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png"
                        />
                    }
                    mediaBackgroundStyle={{ backgroundColor: red[400] }}
                    style={{ backgroundColor: red[600] }}
                    title="This is a very cool feature"
                    subtitle="Just using this will blow your mind."
                />
                <Slide
                    media={
                        <img
                            alt=""
                            src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png"
                        />
                    }
                    mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                    style={{ backgroundColor: blue[600] }}
                    title="Ever wanted to be popular?"
                    subtitle="Well just mix two colors and your are good to go!"
                />
                <Slide
                    media={
                        <img
                            alt=""
                            src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png"
                        />
                    }
                    mediaBackgroundStyle={{ backgroundColor: green[400] }}
                    style={{ backgroundColor: green[600] }}
                    title="May the force be with you"
                    subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
                />
            </AutoRotatingCarousel>
        </>
    )
}

export default Introduction
