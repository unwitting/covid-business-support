import React from "react"
import { graphql } from "gatsby"

import BaseTemplate from "./base"
import BusinessSocialList from "../components/business_social_list"

import classes from "./business_page.module.scss"
import BusinessMeasures from "../components/business_measures"

export default function Template({ data }) {
  const business = data.business.edges[0].node
  const { name, location, website, social, slug, measures } = business

  const file = data.file.edges[0].node
  const { relativeDirectory } = file
  const pathToHere = `/${relativeDirectory}/${slug}/`

  return (
    <BaseTemplate
      meta={{
        title: `Support ${name}, ${location} during the Coronavirus pandemic`,
        description: `Find out how to support ${name} in ${location} during the Coronavirus pandemic. For many independents in the UK this is an existential threat, and you can help.`,
      }}
      path={pathToHere}
      breadcrumbs={[
        { text: "Home", path: "/" },
        { text: location, path: `/${relativeDirectory}/` },
      ]}
    >
      <main className={classes.main}>
        <h1>
          {name}, {location}
        </h1>
        <BusinessMeasures businessName={name} measures={measures} />
        <BusinessSocialList
          twitter={social.twitter}
          instagram={social.instagram}
          facebook={social.facebook}
          pinterest={social.pinterest}
          website={website}
        />
      </main>
    </BaseTemplate>
  )
}

export const pageQuery = graphql`
  query($businessID: String!, $fileID: String!) {
    business: allBusiness(filter: { id: { eq: $businessID } }, limit: 1) {
      edges {
        node {
          name
          location
          slug
          website
          measures
          social {
            instagram
            twitter
            facebook
            pinterest
          }
        }
      }
    }
    file: allFile(filter: { id: { eq: $fileID } }, limit: 1) {
      edges {
        node {
          relativeDirectory
        }
      }
    }
  }
`
