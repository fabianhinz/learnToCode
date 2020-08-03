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

const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

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
                        lectures {
                            title
                            description
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

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    const CATALOG_ROOT = 'src/components/Catalog/'

    const RootComponent = path.resolve(CATALOG_ROOT + 'CatalogRoot.tsx')
    const TopicComponent = path.resolve(CATALOG_ROOT + 'CatalogTopic.tsx')
    const LectureComponent = path.resolve(CATALOG_ROOT + 'CatalogLecture.tsx')

    const rootNodes = []
    const topicNodes = []

    const createSpecificPage = (component, path, nodes) =>
        createPage({
            path,
            component: component,
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
                createSpecificPage(
                    RootComponent,
                    path,
                    rootNodes.filter(node => path === '/' + node.parent.relativeDirectory)
                )
                break
            case 1:
                topicNodes.push(node)
                createSpecificPage(
                    TopicComponent,
                    path,
                    topicNodes.filter(node => path === '/' + node.parent.relativeDirectory)
                )
                break
            case 3:
                createSpecificPage(LectureComponent, path, [node])
                break
            default:
                break
        }
    })
}
