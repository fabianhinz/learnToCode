import { Avatar, ButtonBase, Grid, makeStyles, Typography } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'

import LectureIcon from '../../../static/topicOrTechnology.png'
import useVibrantBackground from '../../hooks/useVibrantBackground'
import { Progress, useProgressContext } from '../Provider/ProgressProvider'
import AppLink from '../Shared/AppLink'
import Title from '../Shared/Title'

type LectureInProgress = Pick<Progress, 'lastTimeWorkedOn' | 'lecture' | 'technology' | 'topic'> & {
    relativeDir: string
}

type StyleProps = undefined | { backgroundColor?: string }

const useStyles = makeStyles(theme => ({
    card: {
        padding: theme.spacing(1),
        display: 'flex',
        maxWidth: 300,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        flexWrap: 'nowrap',
        overflow: 'auto',
    },
    buttonbase: {
        borderRadius: '50%',
        position: 'relative',
    },
    avatar: {
        width: 160,
        height: 160,
        ...theme.typography.h4,
        backgroundColor: (props: StyleProps) =>
            props?.backgroundColor || theme.palette.background.paper,
        transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeOut,
        }),
        boxShadow: theme.shadows[4],
        textTransform: 'uppercase',
    },
    avatarImg: {
        zIndex: 1,
        objectFit: 'contain',
        height: '50%',
    },
    lectureTypography: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%',
        backgroundColor: theme.palette.background.paper,
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: theme.spacing(2),
    },
}))

interface UserLectureProps {
    nodes: any[]
    lecture: LectureInProgress
}

const UserLecture = ({ nodes, lecture }: UserLectureProps) => {
    const [imgSrc, setImgrSrc] = useState('')
    const backgroundColor = useVibrantBackground(imgSrc, 'LightMuted')
    const classes = useStyles({ backgroundColor })

    const iconPath = useMemo(
        () =>
            nodes.find(
                node =>
                    node.parent.relativeDirectory === lecture.topic &&
                    node.frontmatter.pathTitle === lecture.technology
            )?.frontmatter.iconPath?.publicURL,
        [lecture.technology, lecture.topic, nodes]
    )

    useLayoutEffect(() => {
        setImgrSrc(iconPath || LectureIcon)
    }, [iconPath])

    return (
        <AppLink to={'/' + lecture.relativeDir}>
            <ButtonBase className={classes.buttonbase}>
                <Avatar
                    classes={{ root: classes.avatar, img: classes.avatarImg }}
                    src={iconPath || LectureIcon}
                    variant="circle">
                    <div />
                </Avatar>
                <div className={classes.lectureTypography}>
                    <Typography variant="button">{lecture.lecture}</Typography>
                </div>
            </ButtonBase>
        </AppLink>
    )
}

const UserLectures = () => {
    const { progressByRelDir } = useProgressContext()
    const [lectureInProgress, setLectureInProgress] = useState<LectureInProgress[]>([])

    const classes = useStyles()

    useEffect(() => {
        setLectureInProgress(
            Array.from(
                progressByRelDir.entries(),
                ([relativeDir, progress]) =>
                    progress.status === 'inProgress' && {
                        lastTimeWorkedOn: progress.lastTimeWorkedOn,
                        topic: progress.topic,
                        technology: progress.technology,
                        lecture: progress.lecture,
                        relativeDir,
                    }
            )
                .filter(Boolean)
                .sort((a, b) => b.lastTimeWorkedOn.toMillis() - a.lastTimeWorkedOn.toMillis())
        )
    }, [progressByRelDir])

    const iconPaths = useStaticQuery(graphql`
        query iconPaths {
            allMarkdownRemark {
                nodes {
                    parent {
                        ... on File {
                            relativeDirectory
                        }
                    }
                    frontmatter {
                        iconPath {
                            publicURL
                        }
                        pathTitle
                    }
                }
            }
        }
    `)

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Title>Fortsetzen</Title>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} className={classes.container}>
                    {lectureInProgress.map(lecture => (
                        <Grid item key={lecture.relativeDir}>
                            <UserLecture
                                nodes={iconPaths.allMarkdownRemark.nodes}
                                lecture={lecture}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default UserLectures
