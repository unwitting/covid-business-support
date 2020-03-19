import React from "react"
import remark from "remark"
import recommendedRemark from "remark-preset-lint-recommended"
import htmlRemark from "remark-html"

export default function BusinessMeasures({ businessName, measures }) {
  const htmlMeasures = measures.map(measureMarkdown =>
    remark()
      .use(recommendedRemark)
      .use(htmlRemark)
      .processSync(measureMarkdown)
      .toString()
  )
  return (
    <>
      <h2>How you can help</h2>
      <p>
        Stay safe and don't go to a business in person if you are ill or should
        be self-isolating under current official advice, but your support is
        vital during this period. {businessName} have taken the following
        measures to make it possible:
      </p>
      <ul>
        {htmlMeasures.map((html, i) => (
          <li
            key={`business-measures-item-${i}-${html.substr(0, 50)}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </ul>
    </>
  )
}
