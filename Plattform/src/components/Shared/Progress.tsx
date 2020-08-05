import { LinearProgress, makeStyles } from '@material-ui/core'
import React, { useLayoutEffect, useState } from 'react'

const useStyles = makeStyles(() => ({
    root: {
        height: (props: Props) => props.height || 16,
        width: 200,
        backgroundColor: (props: Props) => props.backgroundColor,
    },
    bar: {
        backgroundColor: (props: Props) => props.barColor,
    },
}))

interface Props {
    height?: number
    backgroundColor: string
    barColor: string
    value: number
}

const Progress = ({ value, ...styleProps }: Props) => {
    const [internalValue, setInternalValue] = useState(0)

    const classes = useStyles(styleProps)

    useLayoutEffect(() => {
        const timeout = setTimeout(() => setInternalValue(value), 250)

        return () => {
            clearTimeout(timeout)
        }
    }, [value])

    return <LinearProgress classes={classes} value={internalValue} variant="determinate" />
}

export default Progress
