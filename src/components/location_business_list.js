import React from "react"
import { Link } from "gatsby"

export default function LocationBusinessList({ businesses }) {
  const { location } = businesses[0]
  return (
    <>
      <h2>Not on this list?</h2>
      <p>
        Check out the "Contributing" header on the <Link to="/">home page</Link>
        .
      </p>
      <h2>Business list</h2>
      <p>
        Find out how local businesses in {location} are making it possible for
        you to help them during the Coronavirus / COVID-19 pandemic:
      </p>
      <ul>
        {businesses.map(({ name, location, slug, path }, i) => {
          if (slug === "demo-business") {
            return null
          }
          return (
            <li key={`location-business-list-${location}-${i}-${name}`}>
              <Link to={path}>{name}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
