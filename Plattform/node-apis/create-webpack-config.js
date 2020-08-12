/**
 * Enables hot reload in development mode.
 */

exports.enableHotReload = ({ stage, actions }) => {
    if (stage.startsWith('develop')) {
        actions.setWebpackConfig({
            resolve: {
                alias: {
                    'react-dom': '@hot-loader/react-dom',
                },
            },
        })
    }
}

exports.getBuildVersion = ({ plugins, actions }) => {
    const shortSHA = require(`child_process`)
        .execSync(`git rev-parse --short HEAD`, {
            encoding: `utf-8`,
        })
        .trim()
    actions.setWebpackConfig({
        plugins: [
            plugins.define({
                __VERSION__: shortSHA ? JSON.stringify(shortSHA) : 'unknown',
            }),
        ],
    })
}
