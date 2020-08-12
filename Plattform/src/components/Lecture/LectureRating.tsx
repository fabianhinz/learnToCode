import { Box, Hidden, Typography } from '@material-ui/core'
import { People } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'
import React from 'react'

import { relativeDir2CatalogBase } from '../../util/mapper'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import { useRatingContext } from '../Provider/RatingProvider'

interface Props {
    relativeDirectory: string
}

const LectureRating = ({ relativeDirectory }: Props) => {
    const { user } = useFirebaseContext()
    const { userRatings, onUserRatingChange, communityRatings } = useRatingContext()

    const userRating = userRatings.get(relativeDirectory)
    const communityRating = communityRatings.get(relativeDirectory)

    const handleRatingChange = (_: React.ChangeEvent<{}>, newRating: number) => {
        onUserRatingChange({
            ...relativeDir2CatalogBase(relativeDirectory),
            value: newRating,
        })
    }

    return (
        <>
            <Box display="flex" alignItems="center">
                <Hidden xsDown>
                    <Box mr={1}>
                        <Rating
                            disabled={!user}
                            value={userRating?.value ?? null}
                            onChange={handleRatingChange}
                            name={relativeDirectory}
                        />
                    </Box>
                </Hidden>

                <Box width={55} display="flex" flexDirection="column">
                    <Box mb={0.5} display="flex" alignItems="center">
                        <Box mr={0.5} lineHeight={0}>
                            <People color="inherit" />
                        </Box>
                        <Typography>{communityRating?.average ?? '-'}</Typography>
                    </Box>
                </Box>
            </Box>

            <Typography variant="caption">{communityRating?.votes ?? '0'} insgesamt</Typography>
        </>
    )
}

export default LectureRating
