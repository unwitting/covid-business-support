import React from "react"
import Helmet from "react-helmet"

import classes from "./base.module.scss"

export default function BaseTemplate({ children, meta: { title } }) {
  return (
    <>
      <Helmet title={title} />
      <main className={classes.main}>{children}</main>
    </>
  )
}
