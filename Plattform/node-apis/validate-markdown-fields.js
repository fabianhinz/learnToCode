/**
 * Validates the Markdown fields given in the frontmatter section.
 */

const { attachFields } = require(`gatsby-plugin-node-fields`)

const isTopicNode = node =>
    node.fileAbsolutePath && node.fileAbsolutePath.match(/(Katalog)\/(\w+-?)+\.md/g)

const isTechnologyNode = node =>
    node.fileAbsolutePath && node.fileAbsolutePath.match(/(Katalog)(\/(\w+-?)+){1}\/(\w+-?)+\.md/g)

const isLectureNode = node =>
    node.fileAbsolutePath && node.fileAbsolutePath.match(/(Katalog)(\/(\w+-?)+){3}\/(\w+-?)+\.md/g)

const isValidIconPath = value => !value || value.publicURL

const isNonEmptyString = value => Boolean(value)

const isValidOrder = value => Number.isInteger(value)

const baseFields = [
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
    {
        name: 'iconPath',
        getter: node => node.frontmatter.iconPath,
        validator: isValidIconPath,
    },
]

const descriptors = [
    {
        predicate: isTopicNode,
        fields: baseFields,
    },
    {
        predicate: isTechnologyNode,
        fields: baseFields,
    },
    {
        predicate: isLectureNode,
        fields: [
            ...baseFields,
            {
                name: 'logicalOrder',
                getter: node => node.frontmatter.logicalOrder,
                validator: isValidOrder,
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
