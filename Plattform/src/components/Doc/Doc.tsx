import { Card, Grid, makeStyles, Typography, withStyles } from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'
import React from 'react'

import { DocNode } from '../../model/model'

const DocCard = withStyles({ root: { padding: '0 1em', flex: 1 } })(props => (
    <Card elevation={0} {...props} />
))

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        boxShadow: theme.shadows[4],
    },
    name: {
        backgroundColor: blueGrey[900],
        fontSize: theme.typography.h5.fontSize,
        fontFamily: 'Ubuntu',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 150px',
        padding: '0 1em',
        color: theme.palette.getContrastText(blueGrey[900]),
    },
}))

interface Props {
    nodes: DocNode[]
}

const Doc = ({ nodes }: Props) => {
    const classes = useStyles()

    return (
        <Grid container spacing={4}>
            {nodes.map(({ id, html, parent }) => (
                <Grid key={id} item xs={12}>
                    <div className={classes.container}>
                        <div className={classes.name}>{parent.name}</div>

                        <DocCard>
                            <Typography>
                                <span dangerouslySetInnerHTML={{ __html: html }}></span>
                            </Typography>
                        </DocCard>
                    </div>
                </Grid>
            ))}
        </Grid>
    )
}

export default Doc
