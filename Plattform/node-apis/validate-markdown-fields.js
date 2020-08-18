/**
 * Validates the Markdown fields given in the frontmatter section.
 */

const { attachFields } = require(`gatsby-plugin-node-fields`)

const isPageNode = node =>
    Boolean(node.fileAbsolutePath && node.fileAbsolutePath.match(/(Katalog)/))

const isNonEmptyString = value => Boolean(value)

const descriptors = [
    {
        predicate: isPageNode,
        fields: [
            {
                name: 'pathTitle',
                getter: node => node.frontmatter.pathTitle,
                validator: isNonEmptyString,
            },
            {
                name: 'title',
                getter: node => node.frontmatter.title,
                validator: isNonEmptyString,
            },
            {
                name: 'description',
                getter: node => node.frontmatter.description,
                validator: isNonEmptyString,
            },
        ],
    },
]

exports.validateFrontmatterFields = ({ node, actions, getNode }) => {
    try {
        attachFields(node, actions, getNode, descriptors)
    } catch (error) {
        console.error('Error in ' + node.fileAbsolutePath + '\n' + error.message)
        if (process.env.NODE_ENV === 'production') process.exit(1)
    }
}
