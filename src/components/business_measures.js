import React from "react"
import remark from "remark"
import recommendedRemark from "remark-preset-lint-recommended"
import htmlRemark from "remark-html"

export default function BusinessMeasures({ measures }) {
  const htmlMeasures = measures.map(measureMarkdown =>
    remark()
      .use(recommendedRemark)
      .use(htmlRemark)
      .processSync(measureMarkdown)
      .toString()
  )
  return (
    <>
      <h2>Special measures you can take</h2>
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
