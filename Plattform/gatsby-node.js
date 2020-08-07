exports.onCreateWebpackConfig = ({ stage, actions }) => {
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

// validate markdown files

const { attachFields } = require(`gatsby-plugin-node-fields`)

const isPageNode = (node) => node.frontmatter ? true : false

const isNonEmptyString = (value) => value ? true: false

const descriptors =
    [
        {
          predicate: isPageNode,
          fields: [
            {
                name: 'pathTitle',
                getter: node => node.frontmatter.pathTitle,
                validator: isNonEmptyString
            },
            {
                name: 'title',
                getter: node => node.frontmatter.title,
                validator: isNonEmptyString
            },
            {
                name: 'description',
                getter: node => node.frontmatter.description,
                validator: isNonEmptyString
            },
          ]
        }
      ]

exports.onCreateNode = ({ node, actions, getNode }) => {
    try {
    attachFields(node, actions, getNode, descriptors)
    } catch (error) {
        console.error('Error in ' + node.fileAbsolutePath + '\n' + error.message)
        if(process.env.NODE_ENV === 'production')
            process.exit(1)
    }
}

// create pages out of markdown files

const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const result = await graphql(`
        query {
            allMarkdownRemark {
                nodes {
                    id
                    fileAbsolutePath
                    frontmatter {
                        pathTitle
                        title
                        description
                        design
                        iconPath {
                            publicURL
                        }
                        lastUpdate
                    }
                    parent {
                        ... on File {
                            relativeDirectory
                        }
                    }
                    html
                }
            }
        }
    `)

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    const COMPONENTS_ROOT = 'src/components/'
    const CATALOG_ROOT = COMPONENTS_ROOT + 'Catalog/'

    const RootComponent = path.resolve(CATALOG_ROOT + 'CatalogRoot.tsx')
    const TopicComponent = path.resolve(CATALOG_ROOT + 'CatalogTopic.tsx')
    const TechnologyComponent = path.resolve(CATALOG_ROOT + 'CatalogTechnology.tsx')
    const LectureComponent = path.resolve(CATALOG_ROOT + 'CatalogLecture.tsx')
    const AccountComponent = path.resolve(COMPONENTS_ROOT + 'User/User.tsx')

    const topicNodes = []
    const technologyNodes = []
    const lectureNodes = []

    result.data.allMarkdownRemark.nodes.forEach(node => {
        const relDir = node.parent.relativeDirectory
        const pathLevel = !relDir ? 0 : relDir.split('/').length
        switch (pathLevel) {
            case 0:
                topicNodes.push(node)
                break
            case 1:
                technologyNodes.push(node)
                break
            case 3:
                lectureNodes.push(node)
                break
            default:
                break
        }
    })

    const sortNodes = (nodes) => nodes.sort((a,b) => a.frontmatter.title.toLowerCase().localeCompare(b.frontmatter.title.toLowerCase()))

    sortNodes(topicNodes)
    sortNodes(technologyNodes)
    sortNodes(lectureNodes)

    const createSpecificPage = (path, component, node) =>
        createPage({
            path,
            component,
            context: {
                node,
            },
        })

    // create root page to display topics
    createSpecificPage('/', RootComponent, { children: topicNodes })

    // account page should know about the catalog
    createSpecificPage('/account', AccountComponent, { children: topicNodes })

    // create topic pages to display relating technologies
    topicNodes.forEach(topicNode => {
        topicNode.children = technologyNodes.filter(
            technologyNode =>
                technologyNode.parent.relativeDirectory === topicNode.frontmatter.pathTitle
        )
        createSpecificPage(topicNode.frontmatter.pathTitle, TopicComponent, topicNode)
    })

    // create technology pages to display relating lectures
    technologyNodes.forEach(technologyNode => {
        const relPath =
            technologyNode.parent.relativeDirectory + '/' + technologyNode.frontmatter.pathTitle
        technologyNode.children = lectureNodes.filter(lectureNode =>
            lectureNode.parent.relativeDirectory.includes(relPath)
        )
        createSpecificPage(relPath, TechnologyComponent, technologyNode)
    })

    // create separate page for each lecture
    lectureNodes.forEach(lectureNode => {
        createSpecificPage(lectureNode.parent.relativeDirectory, LectureComponent, lectureNode)
    })
}
