import React from "react"
import Helmet from "react-helmet"

import "./base.module.scss"
import Breadcrumbs from "../components/breadcrumbs"

import ogImagePath from "../images/coffee-shop.jpg"
import { StaticQuery } from "gatsby"

export default function BaseTemplate({
  children,
  path,
  meta: { title, description },
  breadcrumbs = null,
}) {
  const fullTitle = `${title ? `${title} | ` : ""}COVID Business Support`
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              siteUrl
            }
          }
        }
      `}
      render={data => {
        const {
          site: {
            siteMetadata: { siteUrl },
          },
        } = data
        const url = `${siteUrl}${path}`
        const ogImageUrl = `${siteUrl}${ogImagePath}`
        return (
          <>
            <Helmet>
              <title>{fullTitle}</title>
              {description && <meta name="description" content={description} />}

              <meta name="twitter:card" content="summary" />
              <meta name="twitter:creator" content="@unwttng" />

              <meta property="og:url" content={url} />
              <meta property="og:image" content={ogImageUrl} />
              <meta property="og:title" content={fullTitle} />
              {description && (
                <meta property="og:description" content={description} />
              )}
            </Helmet>
            {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
            {children}
          </>
        )
      }}
    />
  )
}
