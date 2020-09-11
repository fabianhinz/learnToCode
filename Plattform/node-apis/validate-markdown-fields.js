/**
 * Validates the Markdown fields given in the frontmatter section.
 */

const { attachFields } = require(`gatsby-plugin-node-fields`)
const { PATH_LEVELS } = require('./node-apis-constants')

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
]

const predicateByNode = (node, pathLevel) =>
    node.fileAbsolutePath &&
    node.fileAbsolutePath.includes('Katalog') &&
    node.fileAbsolutePath.split('Katalog')[1].split('/').length - 2 === pathLevel

const descriptors = [
    {
        predicate: node =>
            predicateByNode(node, PATH_LEVELS.topic) ||
            predicateByNode(node, PATH_LEVELS.technology),
        fields: baseFields,
    },
    {
        predicate: node => predicateByNode(node, PATH_LEVELS.lecture),
        fields: [
            ...baseFields,
            {
                name: 'logicalOrder',
                getter: node => node.frontmatter.logicalOrder,
                validator: isValidOrder,
                defaultValue: 0,
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
