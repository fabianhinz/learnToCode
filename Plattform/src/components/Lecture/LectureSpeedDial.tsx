import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { CloudDownload, Code, GitHub, Launch } from '@material-ui/icons'
import { SpeedDial, SpeedDialAction, SpeedDialActionProps } from '@material-ui/lab'
import React, { useMemo } from 'react'

const mobileActions: (SpeedDialActionProps & { parentAction: SpeedDialParentAction })[] = [
    { icon: <CloudDownload />, tooltipTitle: 'Herunterladen', parentAction: 'downloadLecture' },
    { icon: <GitHub />, tooltipTitle: 'Brauche Hilfe', parentAction: 'openGithubIssue' },
]

const desktopActions: (SpeedDialActionProps & { parentAction: SpeedDialParentAction })[] = [
    { icon: <Launch />, tooltipTitle: 'Starten', parentAction: 'openStackblitz' },
    { icon: <CloudDownload />, tooltipTitle: 'Herunterladen', parentAction: 'downloadLecture' },
    { icon: <GitHub />, tooltipTitle: 'Brauche Hilfe', parentAction: 'openGithubIssue' },
]

const useStyles = makeStyles(theme => ({
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
    staticTooltipLabel: {
        whiteSpace: 'nowrap',
    },
    speedDialIcon: {
        marginRight: theme.spacing(0.5),
    },
}))

export type SpeedDialParentAction = 'openStackblitz' | 'downloadLecture' | 'openGithubIssue'

interface Props {
    onActionClick: (action: SpeedDialParentAction) => void
}

const LectureSpeedDial = ({ onActionClick }: Props) => {
    const [open, setOpen] = React.useState(false)

    const theme = useTheme()
    const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
    const classes = useStyles()

    const handleActionClick = (action: SpeedDialParentAction) => () => {
        onActionClick(action)
        setOpen(false)
    }

    const actions = useMemo(() => (xsDown ? mobileActions : desktopActions), [xsDown])

    return (
        <SpeedDial
            FabProps={{ variant: 'extended' }}
            ariaLabel="lecture speed dial"
            className={classes.speedDial}
            icon={
                <>
                    <Code className={classes.speedDialIcon} />
                    Lektion
                </>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}>
            {actions.map(action => (
                <SpeedDialAction
                    classes={{ staticTooltipLabel: classes.staticTooltipLabel }}
                    key={action.parentAction}
                    icon={action.icon}
                    tooltipTitle={action.tooltipTitle}
                    onClick={handleActionClick(action.parentAction)}
                    tooltipOpen
                />
            ))}
        </SpeedDial>
    )
}

export default LectureSpeedDial
