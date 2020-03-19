import React from "react"
import { graphql } from "gatsby"

import BaseTemplate from "./base"
import BusinessSocialList from "../components/business_social_list"

import classes from "./business_location_page.module.scss"

export default function Template({ data }) {
  const business = data.business.edges[0].node
  const { name, location, website, social } = business

  const file = data.file.edges[0].node
  const { relativeDirectory } = file

  return (
    <BaseTemplate
      meta={{
        title: `How to support ${name}, ${location} during the Coronavirus pandemic`,
      }}
      breadcrumbs={[
        { text: "Home", path: "/" },
        { text: location, path: `/${relativeDirectory}/` },
      ]}
    >
      <main className={classes.main}>
        <h1>
          {name}, {location}
        </h1>
        <BusinessSocialList
          twitter={social.twitter}
          instagram={social.instagram}
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
          social {
            instagram
            twitter
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
