import { Box, makeStyles, Tooltip, Typography } from '@material-ui/core'
import { blue, green } from '@material-ui/core/colors'
import { AccountCircle, CheckCircle, School } from '@material-ui/icons'
import React, { FC } from 'react'

const useStyles = makeStyles(() => ({
    checkIcon: {
        color: green[500],
    },
    accountIcon: {
        color: blue[500],
    },
}))

interface InfoProps {
    value: number
}

const InfoBase: FC<{ icon: JSX.Element; tooltipTitle: string }> = ({
    children,
    icon,
    tooltipTitle,
}) => (
    <Tooltip title={tooltipTitle} placement="bottom">
        <Box display="flex" alignItems="center">
            <Box lineHeight={0} mr={0.5}>
                {icon}
            </Box>
            <Typography variant="caption">{children || 0}</Typography>
        </Box>
    </Tooltip>
)

const UserInfos = {
    Total: ({ value }: InfoProps) => (
        <InfoBase icon={<School />} tooltipTitle="Lektionen">
            {value}
        </InfoBase>
    ),
    InProgress: ({ value }: InfoProps) => {
        const classes = useStyles()

        return (
            <InfoBase
                icon={<AccountCircle className={classes.accountIcon} />}
                tooltipTitle="in Bearbeitung">
                {value}
            </InfoBase>
        )
    },
    Done: ({ value }: InfoProps) => {
        const classes = useStyles()

        return (
            <InfoBase
                icon={<CheckCircle className={classes.checkIcon} />}
                tooltipTitle="abgeschlossen">
                {value}
            </InfoBase>
        )
    },
}

export default UserInfos
