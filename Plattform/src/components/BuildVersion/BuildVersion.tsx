import { Box, Typography } from '@material-ui/core'
import React from 'react'

const BuildVersion = () => {
    return (
        <Box position="fixed" left="10px" bottom="5px" zIndex="-1">
            <Typography color="textSecondary" variant="body2">
                Version: {__VERSION__}
            </Typography>
        </Box>
    )
}

export default BuildVersion
