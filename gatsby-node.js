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
      allGoogleSheetDataRow {
        nodes {
          id
          location
          slug
        }
      }
    }
  `)

  if (businessResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL businesses query`)
    return
  }

  businessResult.data.allGoogleSheetDataRow.nodes.forEach(
    ({ id: businessID, location, slug }) => {
      if (slug === "demo-business") {
        return
      }
      const locationSlug = location.toLowerCase()
      const path = `/businesses/locations/${locationSlug}/${slug}/`
      createPage({
        path,
        component: businessTemplate,
        context: { businessID },
      })
    }
  )

  // Business locations from JSON
  const businessLocationTemplate = path.resolve(
    `src/templates/business_location_page.js`
  )

  const businessLocationResult = await graphql(`
    {
      allGoogleSheetDataRow {
        nodes {
          location
        }
      }
    }
  `)

  if (businessLocationResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL business location query`)
    return
  }

  const businessLocations = _(
    businessLocationResult.data.allGoogleSheetDataRow.nodes
  )
    .map(({ location }) => location)
    .uniq()
    .value()

  businessLocations.forEach(location => {
    const locationSlug = location.toLowerCase()
    const pathBase = `businesses/locations/${locationSlug}`
    createPage({
      path: `/${pathBase}/`,
      component: businessLocationTemplate,
      context: { location },
    })
  })
}
