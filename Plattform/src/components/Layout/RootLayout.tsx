import { Box, Button, Card, CardActions } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { SnackbarProvider } from 'notistack'
import React, { FC } from 'react'

import CatalogErrorBoundary, { ErrorFallbackPRops } from '../Catalog/CatalogErrorBoundary'
import FirebaseProvider from '../Provider/FirebaseProvider'
import LectureProvider from '../Provider/LectureProvider'
import ProgressProvider from '../Provider/ProgressProvider'
import RatingProvider from '../Provider/RatingProvider'

const RootFallback = ({ error, handleSubmit }: ErrorFallbackPRops) => (
    <Box
        position="fixed"
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Box margin={2} maxWidth={400}>
            <Card elevation={8}>
                <Alert color="error">
                    <AlertTitle>{error?.error.message}</AlertTitle>
                    Die Anwendung ist abgestürzt. Bitte gib uns bescheid sollte der Fehler erneut
                    auftreten
                </Alert>
                <CardActions>
                    <Button fullWidth disabled={!error} onClick={handleSubmit}>
                        Fehler melden
                    </Button>
                </CardActions>
            </Card>
        </Box>
    </Box>
)

const RootLayout: FC = ({ children }) => (
    <CatalogErrorBoundary onRenderFallback={RootFallback}>
        <SnackbarProvider
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            autoHideDuration={3000}
            preventDuplicate>
            <FirebaseProvider>
                <ProgressProvider>
                    <LectureProvider>
                        <RatingProvider>{children}</RatingProvider>
                    </LectureProvider>
                </ProgressProvider>
            </FirebaseProvider>
        </SnackbarProvider>
    </CatalogErrorBoundary>
)

export default RootLayout
