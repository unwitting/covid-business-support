import React from "react"
import { Link } from "gatsby"

export default function LocationBusinessList({ businesses }) {
  const { location } = businesses[0]
  return (
    <>
      <h2>Not on this list?</h2>
      <p>
        For now, get in touch with Jack{" "}
        <a href="https://twitter.com/unwttng">via Twitter</a>. We'll have a more
        robust contribution mechanism soon, hold tight.
      </p>
      <h2>Business list</h2>
      <p>
        Find out how local businesses in {location} are making it possible for
        you to help them during the Coronavirus / COVID-19 pandemic:
      </p>
      <ul>
        {businesses.map(({ name, location, lastUpdated, path }, i) => (
          <li key={`location-business-list-${location}-${i}-${name}`}>
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
