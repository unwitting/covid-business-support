import React from "react"
import { Link } from "gatsby"

import classes from "./breadcrumbs.module.scss"

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <header className={classes.breadcrumbs}>
      <ul>
        {breadcrumbs.map(({ text, path }) => (
          <li>
            <Link to={path}>{text}</Link>
          </li>
        ))}
      </ul>
    </header>
  )
}
