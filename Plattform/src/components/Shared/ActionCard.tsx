import { Card, withStyles } from '@material-ui/core'

const ActionCard = withStyles(theme => ({
    root: { cursor: 'pointer', boxShadow: theme.shadows[4] },
}))(Card)

export default ActionCard
