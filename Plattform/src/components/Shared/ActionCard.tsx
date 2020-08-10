import { Card, CardActionArea, CardProps, WithStyles, withStyles } from '@material-ui/core'
import React from 'react'

type Props = WithStyles & CardProps & { disableActionArea?: boolean }

export default withStyles(theme => ({
    root: { cursor: 'pointer', boxShadow: theme.shadows[4] },
}))(function ActionCard({ children, disableActionArea, ...cardProps }: Props) {
    const card = <Card {...cardProps}>{children}</Card>
    return disableActionArea ? card : <CardActionArea>{card}</CardActionArea>
})
