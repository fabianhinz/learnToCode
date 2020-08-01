import React, { FC } from "react"
import { Container, Box } from "@material-ui/core"

const Main: FC = props => (
    <main>
        <Box marginTop={2}>
            <Container maxWidth="xl">{props.children}</Container>
        </Box>
    </main>
)

export default Main
