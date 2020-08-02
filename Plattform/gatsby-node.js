// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
const path = require("path")

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
                    shortDescription
                    lectures
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

    // Create pages for each markdown file.
    const root = path.resolve(`src/components/root.tsx`)
    const topic = path.resolve(`src/components/topic.tsx`)
    const technology = path.resolve(`src/components/technology.tsx`)
    const lecture = path.resolve(`src/components/lecture.tsx`)

    const rootNodes = []
    const topicNodes = []
    const technologyNodes = []
    const lectureNodes = []

    const createSpecificPage = (component, path, nodes) => createPage({
        path,
        component: component,
        // In your blog post template's graphql query, you can use pagePath
        // as a GraphQL variable to query for data from the markdown file.
        context: {
        nodes
        },
    })

    result.data.allMarkdownRemark.nodes.forEach( node => {
        const relDir = node.parent.relativeDirectory    
        const pathLevel = !relDir ? 0 : relDir.split('/').length
        const path = '/' + relDir
        switch (pathLevel) {
            case 0:
                rootNodes.push(node)
                createSpecificPage(root, path, rootNodes)
                break;
            case 1:
                topicNodes.push(node)
                createSpecificPage(topic, path, topicNodes)
                break;
            case 2:
                technologyNodes.push(node)
                createSpecificPage(technology, path, technologyNodes)
                break;
            case 3:
                lectureNodes.push(node)
                createSpecificPage(lecture, path, lectureNodes)
                break;
            default:
                break;
        }
    })
}