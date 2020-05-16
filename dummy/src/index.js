import React from 'react';
import {render} from 'react-dom'
import { Grid, Button } from '@material-ui/core'

const App = () => 
    <Grid container spacing={1}> 
        <Grid item><Button variant="contained" color="default">click me </Button></Grid>
        <Grid item><Button variant="text" color="default">click me </Button></Grid>
        <Grid item><Button variant="outlined" color="default">click me </Button></Grid>
    </Grid>

render(<App />, document.getElementById('root'));
