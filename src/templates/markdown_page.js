import React from "react"
import { graphql } from "gatsby"
import BaseTemplate from "./base"

export default function Template({
  data: {
    markdownRemark: {
      frontmatter: { title, date },
      html,
    },
  },
}) {
  return (
    <BaseTemplate meta={{ title }}>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{title}</h1>
          <h2>{date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
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
      }
    }
  }
`
