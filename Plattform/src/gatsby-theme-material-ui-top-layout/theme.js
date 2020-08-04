import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'
import { blue, red } from '@material-ui/core/colors'

const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: red,
            secondary: blue,
        },
        typography: {
            h1: {
                fontFamily: 'Noto Sans',
            },
            h2: {
                fontFamily: 'Noto Sans',
            },
            h3: {
                fontFamily: 'Noto Sans',
            },
            h4: {
                fontFamily: 'Noto Sans',
            },
            h5: {
                fontFamily: 'Noto Sans',
            },
        },
        shape: {
            borderRadius: 8,
        },
        overrides: {
            MuiChip: {
                label: {
                    fontFamily: 'Ubuntu',
                },
            },
        },
    })
)

export default theme
