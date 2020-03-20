import React from "react"
import { graphql } from "gatsby"

import BaseTemplate from "./base"
import LocationBusinessList from "../components/location_business_list"

import classes from "./business_location_page.module.scss"

export default function Template({ data, pageContext }) {
  const { location } = pageContext
  const locationSlug = location.toLowerCase()
  const pathToHere = `/businesses/locations/${locationSlug}/`
  const businesses = data.allGoogleSheetDataRow.nodes.map(business => ({
    ...business,
    path: `${pathToHere}${business.slug}`,
  }))

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
  query($location: String!) {
    allGoogleSheetDataRow(
      filter: { location: { eq: $location } }
      sort: { fields: name, order: ASC }
    ) {
      nodes {
        name
        location
        slug
      }
    }
  }
`
