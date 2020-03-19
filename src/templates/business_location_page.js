import React from "react"
import { graphql } from "gatsby"

import BaseTemplate from "./base"
import LocationBusinessList from "../components/location_business_list"

import classes from "./business_location_page.module.scss"

export default function Template({ data }) {
  const files = data.files.edges.map(({ node }) => node)
  const businesses = files.map(file => ({
    ...file.childBusiness,
    path: `/${file.relativeDirectory}/${file.childBusiness.slug}/`,
  }))

  const location = businesses[0].location
  return (
    <BaseTemplate
      meta={{
        title: `How to support local businesses in ${location} during the Coronavirus pandemic`,
      }}
      breadcrumbs={[{ text: "Home", path: "/" }]}
    >
      <main className={classes.main}>
        <h1>
          {`Support local businesses in ${location} during the Coronavirus pandemic`}
        </h1>
        <LocationBusinessList businesses={businesses} />
      </main>
    </BaseTemplate>
  )
}

export const pageQuery = graphql`
  query($fileGlob: String!) {
    files: allFile(
      filter: { relativePath: { glob: $fileGlob } }
      sort: { order: ASC, fields: childBusiness___name }
    ) {
      edges {
        node {
          id
          relativeDirectory
          childBusiness {
            slug
            location
            name
          }
        }
      }
    }
  }
`
