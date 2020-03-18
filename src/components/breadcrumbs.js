import React from "react"
import { Link } from "gatsby"

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <header>
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
