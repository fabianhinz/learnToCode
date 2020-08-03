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

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    // Query for markdown nodes to use in creating pages.
    const result = await graphql(`
        query {
            allMarkdownRemark {
                nodes {
                    id
                    frontmatter {
                        title
                        description
                        technologies
                        design
                        iconPath {
                            publicURL
                        }
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

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    const CATALOG_ROOT = 'src/components/Catalog/'

    const RootComponent = path.resolve(CATALOG_ROOT + 'CatalogRoot.tsx')
    const TopicsComponent = path.resolve(CATALOG_ROOT + 'CatalogTopics.tsx')
    const TechnologiesComponent = path.resolve(CATALOG_ROOT + 'CatalogTechnologies.tsx')
    const LecturesComponent = path.resolve(CATALOG_ROOT + 'CatalogLectures.tsx')

    const rootNodes = []
    const topicNodes = []
    const technologyNodes = []
    const lectureNodes = []

    const createSpecificPage = (component, path, nodes) =>
        createPage({
            path,
            component: component,
            // In your blog post template's graphql query, you can use pagePath
            // as a GraphQL variable to query for data from the markdown file.
            context: {
                nodes,
            },
        })

    result.data.allMarkdownRemark.nodes.forEach(node => {
        const relDir = node.parent.relativeDirectory
        const pathLevel = !relDir ? 0 : relDir.split('/').length
        const path = '/' + relDir
        switch (pathLevel) {
            case 0:
                rootNodes.push(node)
                createSpecificPage(RootComponent, path, rootNodes)
                break
            case 1:
                topicNodes.push(node)
                createSpecificPage(TopicsComponent, path, topicNodes)
                break
            case 2:
                technologyNodes.push(node)
                createSpecificPage(TechnologiesComponent, path, technologyNodes)
                break
            case 3:
                lectureNodes.push(node)
                createSpecificPage(LecturesComponent, path, lectureNodes)
                break
            default:
                break
        }
    })
}
