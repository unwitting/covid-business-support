import React from "react"
import { graphql } from "gatsby"

import BaseTemplate from "./base"
import LocationBusinessList from "../components/location_business_list"

import classes from "./business_location_page.module.scss"

export default function Template({ data }) {
  const files = data.files.edges.map(({ node }) => node)
  const pathToHere = `/${files[0].relativeDirectory}/`
  const businesses = files.map(file => ({
    ...file.childBusiness,
    path: `${pathToHere}${file.childBusiness.slug}/`,
  }))

  const location = businesses[0].location
  return (
    <BaseTemplate
      meta={{
        title: `Support local businesses in ${location} during the Coronavirus pandemic`,
        description: `Find out how to support small businesses in ${location} during the Coronavirus / COVID-19 pandemic. For many independents in the UK this is an existential threat, and you can help.`,
      }}
      breadcrumbs={[{ text: "Home", path: "/" }]}
      path={pathToHere}
    >
      <main className={classes.main}>
        <h1>
          {`How to support local businesses in ${location} during the Coronavirus pandemic`}
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
