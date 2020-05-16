import React from 'react';
import {render} from 'react-dom'
import Button from '@material-ui/core/Button'

const App = () => <Button variant="contained" color="default">click me </Button>

render(<App />, document.getElementById('root'));
