import { Button, Typography } from '@material-ui/core'
import { blue, green, red } from '@material-ui/core/colors'
import { Alert } from '@material-ui/lab'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import React, { useState } from 'react'

const Introduction = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Alert
                icon={false}
                action={
                    <Button onClick={() => setOpen(true)} color="inherit">
                        los gehts
                    </Button>
                }>
                <Typography variant="h6">Auf Niveau angepassten Lernpfad starten</Typography>
            </Alert>
            <AutoRotatingCarousel
                label="Get started"
                open={open}
                onClose={() => setOpen(false)}
                onStart={() => setOpen(false)}
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
