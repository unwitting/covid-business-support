import React from "react"
import { graphql } from "gatsby"

import BaseTemplate from "./base"
import BusinessSocialList from "../components/business_social_list"

import classes from "./business_page.module.scss"
import BusinessMeasures from "../components/business_measures"

export default function Template({ data }) {
  const business = data.allGoogleSheetDataRow.nodes[0]
  const {
    name,
    slug,
    location,
    website,
    twitter,
    instagram,
    facebook,
    pinterest,
    measure1,
    measure2,
    measure3,
    measure4,
    measure5,
  } = business

  const locationSlug = location.toLowerCase()
  const pathToHere = `//businesses/locations/${locationSlug}/${slug}/`
  const measures = [measure1, measure2, measure3, measure4, measure5].filter(
    x => !!x
  )

  return (
    <BaseTemplate
      meta={{
        title: `Support ${name}, ${location} during the Coronavirus pandemic`,
        description: `Find out how to support ${name} in ${location} during the Coronavirus pandemic. For many independents in the UK this is an existential threat, and you can help.`,
      }}
      path={pathToHere}
      breadcrumbs={[
        { text: "Home", path: "/" },
        { text: location, path: `/${locationSlug}/` },
      ]}
    >
      <main className={classes.main}>
        <h1>
          {name}, {location}
        </h1>
        <BusinessMeasures businessName={name} measures={measures} />
        <BusinessSocialList
          twitter={twitter}
          instagram={instagram}
          facebook={facebook}
          pinterest={pinterest}
          website={website}
        />
      </main>
    </BaseTemplate>
  )
}

export const pageQuery = graphql`
  query($businessID: String!) {
    allGoogleSheetDataRow(filter: { id: { eq: $businessID } }, limit: 1) {
      nodes {
        name
        slug
        location
        website
        twitter
        instagram
        facebook
        pinterest
        measure1
        measure2
        measure3
        measure4
        measure5
      }
    }
  }
`
