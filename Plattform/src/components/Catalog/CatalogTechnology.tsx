import {
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
} from '@material-ui/core'
import { blue, green } from '@material-ui/core/colors'
import { AccountCircle, CheckCircle, School } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'
import { navigate } from 'gatsby'
import React from 'react'

import topicOrTechnologyImage from '../../../static/topicOrTechnology.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import useNavTextEffect from '../../hooks/useNavTextEffect'
import { GatsbyProps, PathContextNode } from '../../model/model'
import { useProgressContext } from '../Provider/ProgressProvider'
import ActionCard from '../Shared/ActionCard'
import Title from '../Shared/Title'

const useStyles = makeStyles(() => ({
    checkIcon: {
        color: green[500],
    },
    accountIcon: {
        color: blue[500],
    },
    listItemAvatar: { display: 'flex' },
}))

interface LectureListItemProps {
    node: PathContextNode
    withDivider: boolean
}

const LectureListItem = ({ node, withDivider }: LectureListItemProps) => {
    const { progressByRelDir } = useProgressContext()
    const classes = useStyles()

    const {
        frontmatter: { pathTitle, title, lastUpdate },
        parent,
    } = node
    const progress = progressByRelDir.get(parent.relativeDirectory)

    return (
        <div>
            <ListItem button onClick={() => navigate(pathTitle)}>
                <ListItemAvatar className={classes.listItemAvatar}>
                    {progress?.status === 'done' ? (
                        <CheckCircle className={classes.checkIcon} />
                    ) : progress?.status === 'inProgress' ? (
                        <AccountCircle className={classes.accountIcon} />
                    ) : (
                        <School />
                    )}
                </ListItemAvatar>
                <ListItemText primary={title} secondary={lastUpdate} />
                <ListItemSecondaryAction>
                    <Rating name={pathTitle} />
                </ListItemSecondaryAction>
            </ListItem>
            {withDivider && <Divider />}
        </div>
    )
}

const CatalogTechnology = (props: GatsbyProps) => {
    useBackgroundEffect(
        props.pathContext.node.frontmatter.iconPath?.publicURL || topicOrTechnologyImage
    )
    useNavTextEffect(props.pathContext.node.frontmatter.description)

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2} justify="space-between" alignItems="center">
                        <Grid item>
                            <Title>Lektionen</Title>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <ActionCard>
                        <List disablePadding>
                            {props.pathContext.node.children.map((node, index) => (
                                <LectureListItem
                                    key={node.id}
                                    node={node}
                                    withDivider={
                                        index !== props.pathContext.node.children.length - 1
                                    }
                                />
                            ))}
                        </List>
                    </ActionCard>
                </Grid>
            </Grid>
        </>
    )
}

export default CatalogTechnology
