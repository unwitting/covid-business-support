import React from "react"
import { graphql } from "gatsby"

import BaseTemplate from "./base"
import BusinessSocialList from "../components/business_social_list"

export default function Template({ data }) {
  const business = data.business.edges[0].node

  const { name, location, social } = business

  return (
    <BaseTemplate
      meta={{
        title: `How to support ${name}, ${location} during the Coronavirus pandemic`,
      }}
    >
      <h1>
        {name}, {location}
      </h1>
      <BusinessSocialList
        twitter={social.twitter}
        instagram={social.instagram}
      />
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
          social {
            instagram
            twitter
          }
          slug
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
