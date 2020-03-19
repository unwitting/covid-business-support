# coronavirus-business-support

This is a (very) brief guide to the project and how to contribute new data. I'll hopefully flesh this out more but I'm trying to get the site up and running as quickly as possible. If you want to contribute a documentation / README PR, you're more than welcome!

## Contributing new businesses

If you want to add a business to an existing location, these are the steps:

1. Fork the project
2. Add a new JSON file to `src/json-data/businesses/the-location/`
   - Choose a URL slug (eg `stag-barber`: lower case and numbers, with hyphens) and use it for the `<filename>.json`
   - Copy a nearby file or check out the template below for the actual content
   - **The `slug` field must match the filename**
   - Website and social fields can individually be `null`
3. Raise a PR to this project (if you want a light demo, there's a pretend PR [here](https://github.com/unwitting/covid-business-support/pull/1))
4. Netlify will deploy a preview build for you: watch the PR updates for a link when it's ready
   - The link is a little hard to find: you'll see a line with a green tick and the text `netlify/covid-business-support/deploy-preview — Deploy preview ready!`, next to which is a **Details** link. Click that.
   - If there's a problem building the preview, you'll likely need to check the validity of your JSON and failing that run the build locally yourself
   - That's a bit to cover in itself, but if you're familiar with Gatsby, you need `node v12.15`, and to run `npm run build` after an `npm install`
5. Once everything passes, ping @unwttng and they'll help get it merged

```json
{
  "name": "Company Name",
  "location": "Edinburgh",
  "slug": "same-as-filename-without-the-dot-json",
  "lastUpdated": "2020-03-18",
  "website": "https://the-website-or-null.com",
  "social": {
    "instagram": "IG handle or null",
    "twitter": "Twitter handle (no '@') or null"
  },
  "measures": [
    "Information on changes to business",
    "Or special offers or products the business is offering",
    "You can use **Markdown**"
  ]
}
```
