import { Box, Container } from '@material-ui/core'
import React, { FC } from 'react'

const Main: FC = props => (
    <main>
        <Box marginTop={2}>
            <Container maxWidth="xl">{props.children}</Container>
        </Box>
    </main>
)

export default Main
