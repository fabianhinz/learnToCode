import { Box, Button, Grid, Hidden } from '@material-ui/core'
import { CheckCircle, CloudDownload, Launch } from '@material-ui/icons'
import React from 'react'

import { GatsbyProps } from '../../model/model'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import { useFirestoreContext } from '../Provider/FirestoreProvider'
import FixedFab from '../Shared/FixedFab'
import Title from '../Shared/Title'
import Stackblitz from '../Stackblitz/Stackblitz'

const CatalogLecture = (props: GatsbyProps) => {
    const { firebaseInstance } = useFirebaseContext()
    const { onProgressChange, userprogressByDir } = useFirestoreContext()

    const node = props.pathContext.node
    const manual = <div dangerouslySetInnerHTML={{ __html: node.html }} />

    const handleResolveLecture = () => {
        const [topic, technology, lecture] = node.parent.relativeDirectory.split('/')
        const prevProgress = userprogressByDir.get(node.parent.relativeDirectory)
        onProgressChange({
            topic,
            technology,
            lecture,
            status: prevProgress?.status === 'done' ? 'inProgress' : 'done',
            lastTimeWorkedOn: firebaseInstance.firestore.Timestamp.fromDate(new Date()),
            documentId: prevProgress?.documentId,
        })
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Title>{node.frontmatter.title}</Title>
                        </Grid>
                        {node.frontmatter.lastUpdate && (
                            <Grid item>
                                <Title>{node.frontmatter.lastUpdate}</Title>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    {manual}
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Button onClick={handleResolveLecture} startIcon={<CheckCircle />}>
                            lektion abschließen
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Hidden xsDown implementation="css">
                <Stackblitz
                    manual={manual}
                    path={props.path}
                    onRenderButton={() => (
                        <FixedFab stackNumber={1} color="secondary" startIcon={<Launch />}>
                            Ausprobieren
                        </FixedFab>
                    )}
                />
            </Hidden>

            <FixedFab color="primary" startIcon={<CloudDownload />}>
                herunterladen
            </FixedFab>
        </>
    )
}

export default CatalogLecture
