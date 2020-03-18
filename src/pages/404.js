import React from "react"
import { Link } from "gatsby"

import BaseTemplate from "../templates/base"

const NotFoundPage = () => (
  <BaseTemplate meta={{ title: "Page not found" }}>
    <h1>Page not found</h1>
    <Link to="/">Home</Link>
  </BaseTemplate>
)

export default NotFoundPage
