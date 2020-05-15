const indexJs = `
import React from "react"
import ReactDOM from "react-dom"
import Lecture from "./Components/Lecture"

ReactDOM.render(<Lecture />, document.getElementById("root"))
`

const lecture = `
import React from 'react';
import { Button } from '@material-ui/core';

function Lecture() {
  return <Button color="primary">Hello World</Button>;
}
  
export default Lecture
`

const project = {
    files: {
        'index.html': '<div id="root"></div>',
        'index.js': indexJs,
        'Components/Lecture.js': lecture
    },
    title: 'First lecture',
    description: 'learn2Code@HsKa',
    template: 'javascript',
    dependencies: {
        "@material-ui/core": '*',
        "react": '*',
        "react-dom": '*'
    }
}

function openStackblitz() {
    // StackBlitzSDK.openGithubProject("fabianhinz/learnToCode/tree/stackblitz/react/my-app")
    StackBlitzSDK.openProject(project, {openFile: 'Components/Lecture.js'})
}