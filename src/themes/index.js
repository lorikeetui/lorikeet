import memoize from 'lodash-es/memoize'

// Get an single style from the theme
export function themeStyle(theme, groupName, styleName) {
  const group = theme[groupName]
  if (!group) {
    throw new Error(`The group doesn’t exist in the theme: ${groupName}`)
  }

  // pass the general group to the other groups
  const general = groupName === 'general' ? null : themeGroupGeneral(theme)

  const style = group[styleName]
  if (!style) {
    throw new Error(
      `The style doesn’t exist in the base theme: ${groupName}:${styleName}`
    )
  }

  return style
}

// get general styles first
const themeGroupGeneral = memoize(theme => themeGroup(theme, 'general'))

// Get an entire theme group
export function themeGroup(theme, groupName) {
  const group = theme[groupName]

  // the group is a function
  if (typeof group === 'function') {
    return group({
      general: groupName === 'general' ? null : themeGroupGeneral(theme),
    })
  }

  // use themeStyle() to get the individual styles
  return Object.entries(group).reduce(
    (styles, [styleName, value]) => ({
      ...styles,
      [styleName]: themeStyle(theme, groupName, styleName),
    }),
    {}
  )
}
