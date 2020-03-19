const path = require(`path`)
const _ = require("lodash")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // Markdown
  const markdownTemplate = path.resolve(`src/templates/markdown_page.js`)

  const markdownResult = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (markdownResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL markdown query`)
    return
  }

  markdownResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: markdownTemplate,
      context: {},
    })
  })

  // Businesses from JSON
  const businessTemplate = path.resolve(`src/templates/business_page.js`)

  const businessResult = await graphql(`
    {
      allFile(
        filter: {
          extension: { eq: "json" }
          relativeDirectory: { glob: "businesses/locations/*" }
        }
        sort: { order: ASC, fields: name }
      ) {
        edges {
          node {
            id
            relativeDirectory
            relativePath
            childBusiness {
              slug
              id
            }
          }
        }
      }
    }
  `)

  if (businessResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL businesses query`)
    return
  }

  // TODO check for globally unique slugs

  businessResult.data.allFile.edges.forEach(
    ({
      node: {
        id: fileID,
        relativeDirectory,
        childBusiness: { id: businessID, slug },
      },
    }) => {
      const path = `/${relativeDirectory}/${slug}/`
      createPage({
        path,
        component: businessTemplate,
        context: { businessID, fileID },
      })
    }
  )

  // Business locations from JSON
  const businessLocationTemplate = path.resolve(
    `src/templates/business_location_page.js`
  )

  const businessLocationResult = await graphql(`
    {
      allDirectory(
        filter: { relativeDirectory: { eq: "businesses/locations" } }
        sort: { order: ASC, fields: relativePath }
      ) {
        edges {
          node {
            relativePath
          }
        }
      }
    }
  `)

  if (businessLocationResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL business location query`)
    return
  }

  const businessLocationSlugs = _(
    businessLocationResult.data.allDirectory.edges
  )
    .map(({ node: { relativePath } }) => {
      const [_businesses, _locations, location] = relativePath.split("/")
      return location
    })
    .uniq()
    .value()

  businessLocationSlugs.forEach(locationSlug => {
    const pathBase = `businesses/locations/${locationSlug}`
    createPage({
      path: `/${pathBase}/`,
      component: businessLocationTemplate,
      context: { fileGlob: `${pathBase}/*` },
    })
  })
}
