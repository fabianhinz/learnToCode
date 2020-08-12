import { Box, Grid } from '@material-ui/core'
import React, { useState } from 'react'

import lectureImage from '../../../static/lecture.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import useNavTextEffect from '../../hooks/useNavTextEffect'
import { GatsbyProps } from '../../model/model'
import { createPrefilledIssue } from '../../util/github-service'
import LectureSpeedDial, { SpeedDialParentAction } from '../Lecture/LectureSpeedDial'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import Title from '../Shared/Title'
import Stackblitz from '../Stackblitz/Stackblitz'

const CatalogLecture = (props: GatsbyProps) => {
    const [stackblitzOpen, setStackblitzOpen] = useState(false)
    const { user } = useFirebaseContext()

    useBackgroundEffect(props.pathContext.node.frontmatter.iconPath?.publicURL || lectureImage)
    useNavTextEffect(props.pathContext.node.frontmatter.description)

    const {
        frontmatter: { title, lastUpdate },
        html,
    } = props.pathContext.node

    const handleSpeedDialAction = (action: SpeedDialParentAction) => {
        switch (action) {
            case 'downloadLecture': {
                alert('todo')
                break
            }
            case 'openStackblitz': {
                setStackblitzOpen(true)
                break
            }
            case 'openGithubIssue': {
                window.open(
                    createPrefilledIssue({
                        title: title + ', Version: ' + __VERSION__,
                        labels: ['help wanted'],
                        assignees: ['fabianhinz'],
                        template: 'lecture_issue_template.md',
                    })
                )
                break
            }
        }
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Title>{title}</Title>
                        </Grid>
                        {lastUpdate && (
                            <Grid item>
                                <Title>{lastUpdate}</Title>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </Grid>

                {user && (
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center"></Box>
                    </Grid>
                )}
            </Grid>

            <LectureSpeedDial onActionClick={handleSpeedDialAction} />

            <Stackblitz
                path={props.path}
                node={props.pathContext.node}
                open={stackblitzOpen}
                onClose={() => setStackblitzOpen(false)}
            />
        </>
    )
}

export default CatalogLecture
