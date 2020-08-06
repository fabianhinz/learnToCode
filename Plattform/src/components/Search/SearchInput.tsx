import { InputAdornment, InputBase, makeStyles } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { Search as SearchIcon } from '@material-ui/icons'
import React from 'react'

type StyleProps = { focused: boolean }

const useStyles = makeStyles(theme => ({
    searchRoot: {
        ...theme.typography.h6,
        color: ({ focused }: StyleProps) =>
            focused || theme.palette.type === 'light' ? '#000' : '#fff',
    },
    searchInput: {
        padding: 0,
        textOverflow: 'ellipsis',
    },
    iconOffline: {
        color: orange[500],
    },
}))

interface Props {
    focused: boolean
}

const SearchInput = ({ focused }: Props) => {
    const classes = useStyles({ focused })

    return (
        <>
            <InputBase
                classes={{
                    root: classes.searchRoot,
                    input: classes.searchInput,
                }}
                fullWidth
                placeholder="Suche"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </>
    )
}

export default SearchInput