import {
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
} from '@material-ui/core'
import { blue, green } from '@material-ui/core/colors'
import { AccountCircle, CheckCircle, School } from '@material-ui/icons'
import { navigate } from 'gatsby'
import React from 'react'

import { LectureNodeProps } from '../Catalog/CatalogLecture'
import { useProgressContext } from '../Provider/ProgressProvider'
import LectureRating from './LectureRating'

const useStyles = makeStyles(() => ({
    checkIcon: {
        color: green[500],
    },
    accountIcon: {
        color: blue[500],
    },
    listItemAvatar: { display: 'flex' },
    listItemSecondaryAction: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
}))

interface LectureListItemProps {
    node: LectureNodeProps
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
                <ListItemText primary={title} secondary={lastUpdate || '-'} />
                <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                    <LectureRating relativeDirectory={parent.relativeDirectory} />
                </ListItemSecondaryAction>
            </ListItem>
            {withDivider && <Divider />}
        </div>
    )
}

export default LectureListItem
