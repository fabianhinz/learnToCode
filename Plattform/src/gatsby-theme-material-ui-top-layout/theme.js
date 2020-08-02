import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'
import { blue, red } from '@material-ui/core/colors'

const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: red,
            secondary: blue,
        },
    })
)

export default theme
