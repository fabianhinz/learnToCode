import { InputAdornment, InputBase, makeStyles } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { Search as SearchIcon } from '@material-ui/icons'
import React from 'react'

type StyleProps = { focused: boolean }

const useStyles = makeStyles(theme => ({
    searchRoot: {
        ...theme.typography.h6,
        lineHeight: 'normal',
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
    value: string
    onValueChange: (newValue: string) => void
}

const SearchInput = ({ focused, value, onValueChange }: Props) => {
    const classes = useStyles({ focused })

    return (
        <>
            <InputBase
                classes={{
                    root: classes.searchRoot,
                    input: classes.searchInput,
                }}
                value={value}
                onChange={({ target }) => onValueChange(target.value)}
                fullWidth
                placeholder="Katalog durchsuchen"
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
