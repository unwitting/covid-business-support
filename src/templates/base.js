import React from "react"
import Helmet from "react-helmet"

import "./base.module.scss"
import Breadcrumbs from "../components/breadcrumbs"

export default function BaseTemplate({
  children,
  meta: { title, description },
  breadcrumbs = null,
}) {
  const fullTitle = `${title ? `${title} | ` : ""}COVID Business Support`
  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@unwttng" />

        <meta property="og:title" content={fullTitle} />
        {description && (
          <meta property="og:description" content={description} />
        )}
      </Helmet>
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      {children}
    </>
  )
}
