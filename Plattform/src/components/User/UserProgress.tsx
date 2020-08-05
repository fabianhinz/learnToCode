import {
    Avatar,
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
} from '@material-ui/core'
import { useNavigate } from '@reach/router'
import React from 'react'

import { PathContextNode } from '../../model/model'
import Progress from '../Shared/Progress'

const useStyles = makeStyles(theme => ({
    card: {
        boxShadow: theme.shadows[4],
    },
}))

interface Props {
    node: PathContextNode
}

const UserProgress = ({ node }: Props) => {
    const classes = useStyles()
    const navigate = useNavigate()

    return (
        <Card className={classes.card}>
            <CardHeader title={node.frontmatter.title} />

            <List>
                {node.children.map(({ frontmatter: { title, pathTitle, iconPath } }, index) => (
                    <ListItem
                        onClick={() => navigate(`/${node.frontmatter.pathTitle}/${pathTitle}`)}
                        button
                        key={title + index}>
                        <ListItemAvatar>
                            <Avatar src={iconPath?.publicURL}>{title.slice(0, 1)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={title} />
                        <ListItemSecondaryAction>
                            <Progress value={index + 1 * 10} height={25} />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export default UserProgress
