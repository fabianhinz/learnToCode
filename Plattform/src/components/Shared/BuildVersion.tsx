import { Box, Typography } from '@material-ui/core'
import React from 'react'

const BuildVersion = () => {
    return (
        <Box position="fixed" bottom={5} left={10} zIndex="-1">
            <Typography color="textSecondary" variant="caption">
                Version: {__VERSION__}
            </Typography>
        </Box>
    )
}

export default BuildVersion
