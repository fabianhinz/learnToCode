import { Box, Hidden, Typography } from '@material-ui/core'
import { People } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'
import React, { useState } from 'react'

interface Props {
    relativeDirectory: string
}
// tbd firestore save & function calc & model
const LectureRating = ({ relativeDirectory }: Props) => {
    const [rating, setRating] = useState<number | null>(null)

    // eslint-disable-next-line prettier/prettier
    const [topic, technology, lecture] = relativeDirectory.split('/')

    return (
        <>
            <Box display="flex" alignItems="center">
                <Hidden xsDown>
                    <Box mr={1}>
                        <Rating
                            value={rating}
                            precision={0.5}
                            onChange={(_, newRating) => setRating(newRating)}
                            name={relativeDirectory}
                        />
                    </Box>
                </Hidden>
                <Box width={55} display="flex" flexDirection="column">
                    <Box mb={0.5} display="flex" alignItems="center">
                        <Box mr={0.5} lineHeight={0}>
                            <People color="inherit" />
                        </Box>
                        <Typography>4.8</Typography>
                    </Box>
                </Box>
            </Box>
            <Typography variant="caption">20 insgesamt</Typography>
        </>
    )
}

export default LectureRating
