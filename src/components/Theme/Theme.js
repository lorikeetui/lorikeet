import React from 'react'
import PropTypes from 'prop-types'
import partial from 'lodash-es/partial'
import lorikeetLight from '../../themes/lorikeet-light'
import { themeStyle, themeGroup } from '../../themes'

const DEFAULT_THEME = lorikeetLight

const themeData = theme => ({
  theme,
  themeStyle: partial(themeStyle, theme),
  themeGroup: partial(themeGroup, theme),
  themeGroups: groupNames =>
    groupNames.reduce(
      (groups, groupName) => ({
        ...groups,
        [groupName]: themeGroup(theme, groupName),
      }),
      {}
    ),
})

const { Consumer, Provider } = React.createContext(themeData(DEFAULT_THEME))

class ThemeProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object,
  }
  render() {
    return (
      <Provider value={themeData(this.props.theme)}>
        {this.props.children}
      </Provider>
    )
  }
}

class Theme extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }
  render() {
    return <Consumer>{this.props.children}</Consumer>
  }
}

Theme.Provider = ThemeProvider

const hocWrap = Component => {
  const HOC = props => (
    <Theme>{theme => <Component {...props} theme={theme} />}</Theme>
  )
  HOC.displayName = `Theme(${getDisplayName(Component)})`
  return HOC
}

Theme.Provider = ThemeProvider
Theme.hocWrap = hocWrap

export default Theme
