const path = require("path")

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: "https://pandemicsafetynet.com",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `json-data`,
        path: `${__dirname}/src/json-data`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: "gatsby-transformer-json",
      options: {
        typeName: ({ node: { relativeDirectory }, object }) => {
          const dirSplit = relativeDirectory.split("/")
          if (
            dirSplit[0] === "businesses" &&
            dirSplit[1] === "locations" &&
            dirSplit.length === 3
          ) {
            return "business"
          }
          return "otherJson"
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
  ],
}
