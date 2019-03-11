import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import BaseStyles from '../BaseStyles/BaseStyles'
import { theme } from '../../theme'
import { PublicUrl } from '../../providers/PublicUrl'
import { ensureTrailingSlash } from '../../utils/url'
import { warn } from '../../utils/environment'
import logo from './assets/logo-background.svg'

const StyledAragonApp = styled.main`
  min-width: 320px;
  min-height: 100vh;
  background-color: ${theme.mainBackground};
  background-image: ${({ backgroundLogo }) =>
    backgroundLogo ? css`url(${PublicUrl.styledUrl(logo)})` : 'none'};
  background-position: 50% 50%;
  background-repeat: no-repeat;
`

class AragonApp extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    backgroundLogo: PropTypes.bool,
    publicUrl: PropTypes.string.isRequired,
    children: PropTypes.node,
    supportLegacyAgents: PropTypes.bool,
  }
  static defaultProps = {
    backgroundLogo: false,
  }
  static childContextTypes = {
    publicUrl: PropTypes.string,
  }
  static Styled = StyledAragonApp

  getChildContext() {
    return { publicUrl: ensureTrailingSlash(this.props.publicUrl) }
  }

  render() {
    if (!AragonApp._warned) {
      warn('<AragonApp /> is deprecated: please use <Main /> instead.')
      AragonApp._warned = true
    }

    const {
      children,
      backgroundLogo,
      className,
      publicUrl,
      supportLegacyAgents,
    } = this.props
    const styledProps = { backgroundLogo, className, publicUrl }
    return (
      <PublicUrl.Provider url={ensureTrailingSlash(publicUrl)}>
        <BaseStyles enableLegacyFonts={supportLegacyAgents} />
        <StyledAragonApp {...styledProps}>{children}</StyledAragonApp>
      </PublicUrl.Provider>
    )
  }
}

export default AragonApp
