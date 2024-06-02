import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

type Properties = PageObjectResponse["properties"]

export const propsPlainTexts = (properties: Properties, name: string) => {
  const prop = properties[name]
  if (prop?.type === "rich_text" && prop.rich_text.length > 0) {
    return prop.rich_text.map((t) => t.plain_text).join()
  }
  if (prop?.type === "title" && prop.title.length > 0) {
    return prop.title.map((t) => t.plain_text).join()
  }
  return null
}

export const propsSelect = (properties: Properties, name: string) => {
  const prop = properties[name]
  if (prop?.type === "select" && prop.select !== null) {
    return prop.select.name
  }
  return null
}

export const propsMultiSelect = (properties: Properties, name: string) => {
  const prop = properties[name]
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((ms) => ms.name)
  }
  return null
}

export const propsUrl = (properties: Properties, name: string) => {
  const prop = properties[name]
  if (prop?.type === "url") {
    return prop.url
  }
  return null
}

export const propsNumber = (properties: Properties, name: string) => {
  const prop = properties[name]
  if (prop?.type === "number") {
    return prop.number
  }
  return null
}

export const propsUniqueId = (properties: Properties, name: string) => {
  const prop = properties[name]
  if (prop?.type === "unique_id") {
    return prop.unique_id.number
  }
  return null
}

export const propsCheckbox = (properties: Properties, name: string) => {
  const prop = properties[name]
  if (prop?.type === "checkbox") {
    return prop.checkbox
  }
  return null
}
