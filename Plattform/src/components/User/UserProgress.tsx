import {
    Avatar,
    Box,
    Hidden,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    makeStyles,
    Typography,
} from '@material-ui/core'
import { navigate } from 'gatsby'
import React from 'react'

import { PathContextNode } from '../../model/model'
import { useProgressContext } from '../Provider/ProgressProvider'
import Progress from '../Shared/Progress'
import UserInfos from './Userinfos'

const useStyles = makeStyles(theme => ({
    listItemSecondaryAction: {
        paddingRight: 200 + theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            paddingRight: 48,
        },
    },
}))

interface Props {
    node: PathContextNode
}

const normaliseValue = (done: number, total: number) => (done * 100) / total

interface LinearUserProgressProps {
    done: number
    total: number
    show?: boolean
}

export const LinearUserProgress = ({ done, total }: LinearUserProgressProps) => (
    <Box display="flex" alignItems="center">
        <Hidden smDown>
            <Box flexGrow={1} mr={1}>
                <Progress value={normaliseValue(done, total)} height={25} />
            </Box>
        </Hidden>
        <Hidden mdUp>
            <UserInfos.Done value={done} />
        </Hidden>
    </Box>
)

interface ProgressListItemProps {
    progress: PathContextNode
    technologyPathTitle: string
}

const ProgressListItem = (props: ProgressListItemProps) => {
    const { progressByTechnology } = useProgressContext()
    const classes = useStyles()

    const {
        progress: {
            frontmatter: { title, pathTitle, iconPath, description },
            children,
        },
        technologyPathTitle,
    } = props

    const progress = progressByTechnology.get(`/${technologyPathTitle}/${pathTitle}`)

    if (!progress) return <></>

    return (
        <ListItem
            classes={{ secondaryAction: classes.listItemSecondaryAction }}
            alignItems="flex-start"
            onClick={e => {
                e.stopPropagation()
                navigate(`/${technologyPathTitle}/${pathTitle}`)
            }}
            button>
            <ListItemAvatar>
                <Avatar variant="square" src={iconPath?.publicURL}>
                    {title.slice(0, 1)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={title} secondary={description} />
            <ListItemSecondaryAction>
                <LinearUserProgress done={progress.done} total={children.length} />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const UserProgress = ({ node }: Props) => (
    <>
        <ListSubheader>
            <Typography variant="button" color="inherit">
                {node.frontmatter.title}
            </Typography>
        </ListSubheader>

        {node.children.map(progress => (
            <ProgressListItem
                key={progress.id}
                progress={progress}
                technologyPathTitle={node.frontmatter.pathTitle}
            />
        ))}
    </>
)

export default UserProgress
