import { Box, Button, Grid, Hidden } from '@material-ui/core'
import { CheckCircle, CloudDownload, Launch } from '@material-ui/icons'
import React from 'react'

import lectureImage from '../../../static/lecture.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import useNavTextEffect from '../../hooks/useNavTextEffect'
import { GatsbyProps } from '../../model/model'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import { useProgressContext } from '../Provider/ProgressProvider'
import FixedFab from '../Shared/FixedFab'
import IssueButton from '../Shared/IssueButton'
import Title from '../Shared/Title'
import Stackblitz from '../Stackblitz/Stackblitz'

const CatalogLecture = (props: GatsbyProps) => {
    const { firebaseInstance, user } = useFirebaseContext()
    const { onProgressChange, progressByRelDir } = useProgressContext()

    useBackgroundEffect(props.pathContext.node.frontmatter.iconPath?.publicURL || lectureImage)
    useNavTextEffect(props.pathContext.node.frontmatter.description)

    const node = props.pathContext.node
    const prevProgress = progressByRelDir.get(node.parent.relativeDirectory)
    const manual = <div dangerouslySetInnerHTML={{ __html: node.html }} />

    const handleResolveLecture = () => {
        const [topic, technology, lecture] = node.parent.relativeDirectory.split('/')

        onProgressChange({
            topic,
            technology,
            lecture,
            status: !prevProgress
                ? 'inProgress'
                : prevProgress.status === 'inProgress'
                ? 'done'
                : 'inProgress',
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
                        <Grid item>
                            <IssueButton
                                title={node.frontmatter.title + ', Version: ' + __VERSION__}
                                labels={['help wanted']}
                                assignees={['fabianhinz']}
                                template='lecture_issue_template.md'
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    {manual}
                </Grid>

                {user && (
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Button onClick={handleResolveLecture} startIcon={<CheckCircle />}>
                                lektion{' '}
                                {!prevProgress || prevProgress.status === 'done'
                                    ? 'starten'
                                    : 'abschließen'}
                            </Button>
                        </Box>
                    </Grid>
                )}
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
