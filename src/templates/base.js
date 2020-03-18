import React from "react"
import Helmet from "react-helmet"

import "./base.module.scss"
import Breadcrumbs from "../components/breadcrumbs"

export default function BaseTemplate({
  children,
  meta: { title },
  breadcrumbs = null,
}) {
  return (
    <>
      <Helmet title={title} />
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      {children}
    </>
  )
}
