import { makeStyles } from '@material-ui/core'
import React, { FC, useContext, useState } from 'react'

import useVibrantBackground from '../../hooks/useVibrantBackground'

const Context = React.createContext<{ onBackgroundChange: (background: any) => void } | null>(null)

export const useBackgroundContext = () => useContext(Context)

type StyleProps = { background: string | null; backgroundImage: string | null }

const useStyles = makeStyles(theme => ({
    background: {
        position: 'fixed',
        top: theme.mixins.toolbar.minHeight,
        left: 0,
        width: '100vw',
        height: 'calc(max(40vh, 350px) + 64px)',
        transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeOut,
        }),
        backgroundColor: (props: StyleProps) => props.background,
        backgroundImage: (props: StyleProps) =>
            props.backgroundImage ? `url(${props.backgroundImage})` : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'max(10%, 300px)',
        backgroundPosition: 'center right',
        backgroundOrigin: 'content-box',
        paddingRight: theme.spacing(2),
        zIndex: -1,
        opacity: 0.9,
    },
}))

const BackgroundProvider: FC = ({ children }) => {
    const [backgroundImage, setBackgroundImage] = useState(null)
    const background = useVibrantBackground(backgroundImage, 'LightMuted')

    const classes = useStyles({ background, backgroundImage })

    return (
        <Context.Provider
            value={{
                onBackgroundChange: setBackgroundImage,
            }}>
            <div className={classes.background} />
            {children}
        </Context.Provider>
    )
}

export default BackgroundProvider
