import React from "react"
import Helmet from "react-helmet"

import "./base.module.scss"
import Breadcrumbs from "../components/breadcrumbs"

export default function BaseTemplate({
  children,
  meta: { title, description },
  breadcrumbs = null,
}) {
  return (
    <>
      <Helmet>
        <title>{`${title ? `${title} | ` : ""}COVID Business Support`}</title>
        <meta name="description" content={description} />
      </Helmet>
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      {children}
    </>
  )
}
