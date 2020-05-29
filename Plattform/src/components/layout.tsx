import React, { ReactNode } from "react"

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div
            style={{ margin: `2rem auto`, maxWidth: "90vw", padding: `0 1rem` }}
        >
            {children}
        </div>
    )
}

export default Layout
