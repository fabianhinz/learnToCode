import { Grow, List, ListItem, ListItemText, makeStyles, Paper } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles(theme => ({
    list: {
        maxHeight: '50vh',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    alert: {
        borderRadius: 0,
        borderBottomRightRadius: theme.shape.borderRadius * 4,
        borderBottomLeftRadius: theme.shape.borderRadius * 4,
    },
    paper: {
        position: 'absolute',
        borderRadius: theme.shape.borderRadius * 2,
        boxShadow: theme.shadows[4],
        top: 'calc(100% + 4px)',
        right: 0,
        minWidth: '100%',
        zIndex: 1,
        padding: theme.spacing(1),
    },
}))

interface Props {
    focused
}

const SearchResults = (props: Props) => {
    const [result] = useState<{ values: string[]; info: string | null }>({
        values: [
            'Id dolore officia aliqua commodo quis deserunt sint officia est aute.',
            'Deserunt est pariatur ullamco laborum commodo et occaecat eiusmod Lorem pariatur sit occaecat aliqua amet.',
        ],
        info: null,
    })

    const classes = useStyles()

    return (
        <Grow in={props.focused}>
            <Paper className={classes.paper}>
                <List className={classes.list} disablePadding dense>
                    {result.values.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Grow>
    )
}

export default SearchResults
