import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

import PopoverPaper from '../Shared/PopoverPaper'

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
        <PopoverPaper growIn={props.focused}>
            <List className={classes.list} disablePadding dense>
                {result.values.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </PopoverPaper>
    )
}

export default SearchResults
