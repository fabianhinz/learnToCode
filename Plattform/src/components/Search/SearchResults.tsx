import {
    Grow,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    makeStyles,
    Paper,
} from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'
import { navigate } from 'gatsby'
import React from 'react'

import useSearchQuery from '../../hooks/useSearchQuery'

const useStyles = makeStyles(theme => ({
    list: {
        maxHeight: '50vh',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    paper: {
        position: 'absolute',
        borderRadius: theme.shape.borderRadius * 2,
        boxShadow: theme.shadows[4],
        top: 'calc(100% + 4px)',
        right: 0,
        minWidth: '100%',
        zIndex: theme.zIndex.appBar + 1,
    },
    listSubheader: {
        backgroundColor: blueGrey[50],
        lineHeight: '36px',
    },
}))

interface Props {
    focused: boolean
    query: string
}

const SearchResults = (props: Props) => {
    const { searchResults } = useSearchQuery(props.query)

    const classes = useStyles()

    if (props.query.length === 0 || searchResults.length === 0) return <></>

    return (
        <Grow in={props.focused}>
            <Paper className={classes.paper}>
                <List className={classes.list} disablePadding dense>
                    {searchResults.map(({ subheader, results }) => (
                        <div key={subheader}>
                            <ListSubheader className={classes.listSubheader}>
                                {subheader}
                            </ListSubheader>
                            {results.map(result => (
                                <ListItem
                                    button
                                    onClick={() => navigate('/' + result.relativeDirectory)}
                                    key={result.id}>
                                    <ListItemText primary={result.title} />
                                </ListItem>
                            ))}
                        </div>
                    ))}
                </List>
            </Paper>
        </Grow>
    )
}

export default SearchResults
