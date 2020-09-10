/**
 * Uses the Gatsby-Node APIs to configure the by Gatsby created pages.
 * More information: https://www.gatsbyjs.org/docs/node-apis/
 * Splitting inspired by https://github.com/gatsbyjs/gatsby/blob/7dd464f7c6aea480544485da56a5758b256b58e9/www/gatsby-node.js
 */

const { enableHotReload, getBuildVersion } = require(`./node-apis/create-webpack-config`)
const { createMarkdownPages } = require(`./node-apis/create-markdown-pages`)
const { validateFrontmatterFields } = require(`./node-apis/validate-markdown-fields.js`)

const log = (...args) => console.log('\x1b[33m%s\x1b[0m', ...args)

exports.onCreateWebpackConfig = helpers => {
    log('customizing webpack config')
    getBuildVersion(helpers)
    enableHotReload(helpers)
}

exports.createPages = async helpers => {
    log('creating catalog pages')
    await createMarkdownPages(helpers)
}

exports.onCreateNode = helpers => {
    if (!helpers.node.fileAbsolutePath) return
    log('validating frontmatter fields ', helpers.node.fileAbsolutePath.split('/').slice(-1))
    validateFrontmatterFields(helpers)
}
