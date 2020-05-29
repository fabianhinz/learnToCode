import React from "react"
import { Link } from "gatsby"

const Header = () => {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <h3>Learn2Code@HsKA</h3>
            <div>
                <Link style={{ marginRight: "1rem" }} to="/">
                    home
                </Link>
                <Link style={{ marginRight: "1rem" }} to="/lektionen">
                    lektionen
                </Link>

                <Link style={{ marginRight: "1rem" }} to="/about">
                    about
                </Link>
            </div>
        </div>
    )
}

export default Header
