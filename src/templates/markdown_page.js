import React from "react"
import { graphql } from "gatsby"
import BaseTemplate from "./base"

import classes from "./markdown_page.module.scss"

export default function Template({
  data: {
    markdownRemark: {
      frontmatter: { title, date, path, description },
      html,
    },
  },
}) {
  return (
    <BaseTemplate meta={{ title, description }} path={path}>
      <main
        className={classes.main}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </BaseTemplate>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
      }
    }
  }
`
