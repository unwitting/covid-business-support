# coronavirus-business-support

[![Netlify status](https://api.netlify.com/api/v1/badges/6bfe4bff-786e-4a25-b19b-05ca0d34aa03/deploy-status)](https://app.netlify.com/sites/covid-business-support/deploys) [![Production link](https://img.shields.io/badge/production-link-informational)](https://covidbusinesssupport.com)

This is a (very) brief guide to the project and how to contribute new data to [covidbusinesssupport.com](https://covidbusinesssupport.com). I'll hopefully flesh this out more but I'm trying to get the site up and running as quickly as possible. If you want to contribute a documentation / README PR, you're more than welcome!

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
   - The link is a little hard to find: expand **Show all checks** next to **All checks have passed** and you'll see a line with a green tick and the text `netlify/covid-business-support/deploy-preview — Deploy preview ready!`, next to which is a **Details** link. Click that.
   - If there's a problem building the preview, you'll likely need to check the validity of your JSON and failing that run the build locally yourself
   - That's a bit to cover in itself, but if you're familiar with Gatsby, you need `node v10.19`, and to run `npm run build` after an `npm install`
5. Once everything passes, ping [unwitting](https://github.com/unwitting) and they'll help get it merged

### Template JSON

```json
{
  "name": "Company Name",
  "location": "Edinburgh",
  "slug": "same-as-filename-without-the-dot-json",
  "lastUpdated": "2020-03-18",
  "website": "https://the-website-or-null.com",
  "social": {
    "instagram": "IG handle or null",
    "twitter": "Twitter handle (no '@') or null",
    "facebook": "Facebook handle or null",
    "pinterest": "Pinterest username or null"
  },
  "measures": [
    "Information on changes to business",
    "Or special offers or products the business is offering",
    "You can use **Markdown**"
  ]
}
```
