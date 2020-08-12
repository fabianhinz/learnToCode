import { ClickAwayListener, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

interface StyleProps {
    focused: boolean
}

const useStyles = makeStyles(theme => ({
    searchContainer: {
        display: 'flex',
        position: 'relative',
        backgroundColor: ({ focused }: StyleProps) =>
            focused
                ? '#fff'
                : theme.palette.type === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.08)',
        boxShadow: ({ focused }: StyleProps) =>
            theme.palette.type === 'light' && focused ? theme.shadows[1] : 'unset',
        borderRadius: theme.shape.borderRadius * 2,
        padding: theme.spacing(1),
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.easeOut,
        }),
        width: (props: StyleProps) => (props.focused ? 300 : 200),
    },
}))

export interface SearchQuery {
    value: string
    loading: boolean
}

const Search = () => {
    const [query, setQuery] = useState('')
    const [focused, setFocused] = useState(false)

    const classes = useStyles({ focused })

    const handleFocusChange = (direction: 'in' | 'out') => () => {
        setFocused(direction === 'in' ? true : false)
    }

    return (
        <ClickAwayListener onClickAway={handleFocusChange('out')}>
            <div onFocus={handleFocusChange('in')} className={classes.searchContainer}>
                <SearchInput focused={focused} value={query} onValueChange={setQuery} />
                <SearchResults focused={focused} query={query} />
            </div>
        </ClickAwayListener>
    )
}

export default Search
