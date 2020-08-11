/**
 * Uses the Gatsby-Node APIs to configure the by Gatsby created pages.
 * More information: https://www.gatsbyjs.org/docs/node-apis/
 * Splitting inspired by https://github.com/gatsbyjs/gatsby/blob/7dd464f7c6aea480544485da56a5758b256b58e9/www/gatsby-node.js
 */

const { enableHotReload, getBuildVersion } = require(`./node-apis/create-webpack-config`)
const { createMarkdownPages } = require(`./node-apis/create-markdown-pages`)
const { validateFrontmatterFields } = require(`./node-apis/validate-markdown-fields.js`)

exports.onCreateWebpackConfig = helpers => {
    getBuildVersion(helpers)
    enableHotReload(helpers)
}

exports.createPages = async helpers => await createMarkdownPages(helpers)

exports.onCreateNode = helpers => validateFrontmatterFields(helpers)
