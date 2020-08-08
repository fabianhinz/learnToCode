import { FC, ReactText, useContext, useState } from 'react'
import React from 'react'

interface NavTextContext {
    navText: ReactText | null
    showNavText: boolean
    onNavTextChange: (text: ReactText) => void
    onShowNavTextChange: (show: boolean) => void
}

const Context = React.createContext<NavTextContext | null>(null)
export const useNavTextContext = () => useContext(Context)

const NavTextProvider: FC = ({ children }) => {
    const [navText, setNavText] = useState<ReactText | null>(null)
    const [showNavText, setShowNavText] = useState(true)

    return (
        <Context.Provider
            value={{
                navText,
                onNavTextChange: setNavText,
                showNavText,
                onShowNavTextChange: setShowNavText,
            }}>
            {children}
        </Context.Provider>
    )
}

export default NavTextProvider
