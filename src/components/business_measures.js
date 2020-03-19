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
        Alongside your usual business as far as it's possible and safe to do so,{" "}
        {businessName} have taken the following special measures to allow you to
        support them:
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
