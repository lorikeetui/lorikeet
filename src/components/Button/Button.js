import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { animated, Spring } from 'react-spring'
import { unselectable, springs } from '../../styles'
import { noop } from '../../utils'
import Theme from '../Theme/Theme'

class Button extends React.Component {
  static propTypes = {
    /** The button type, that will be passed to the HTML element. */
    type: PropTypes.string,
    /** Sets an URL to open when the button is clicked. When the href prop is set, an <a> element is used instead of a <button>. */
    href: PropTypes.string,
    /** Changes the button mode. Using “strong” makes the button look more important. */
    mode: PropTypes.oneOf(['strong', 'normal']),
    /** Disables the button. onClick won’t be called in that mode. */
    disabled: PropTypes.bool,
    /** This is called when the user activates the button (pointer device or keyboard). */
    onClick: PropTypes.func,
  }
  static defaultProps = {
    type: 'button',
    mode: 'normal',
    disabled: false,
    onClick: noop,
  }
  state = {
    pressed: false,
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp)
  }
  handleMouseDown = () => {
    this.setState({ pressed: true })
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mouseup', this.handleMouseUp)
  }
  handleMouseUp = () => {
    this.setState({ pressed: false })
  }
  render() {
    const { pressed } = this.state
    const {
      href,
      mode,
      disabled,
      type,
      onClick,
      ModeNormalButtonComponent,
    } = this.props
    return (
      <Theme>
        {({ themeGroups }) => {
          const theme = themeGroups(['general', 'button'])
          const ButtonComponent = theme.button.ButtonComponent || StyledButton
          return (
            <Spring
              from={{ pressProgress: 0 }}
              to={{ pressProgress: Number(pressed) }}
              config={springs.instant}
              native
            >
              {({ pressProgress }) => (
                <ButtonComponent
                  {...this.props}
                  theme={theme}
                  mode={mode}
                  disabled={disabled}
                  as={href !== undefined ? 'a' : undefined}
                  type={href === undefined ? type : undefined}
                  onClick={onClick}
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}
                  style={
                    disabled
                      ? undefined
                      : theme.button.interpolatedStyles({ pressProgress })
                  }
                />
              )}
            </Spring>
          )
        }}
      </Theme>
    )
  }
}

const StyledButton = styled(animated.button)`
  display: inline-block;
  width: ${({ wide }) => (wide ? '100%' : 'auto')};
  padding: 10px 15px;
  white-space: nowrap;
  font-size: ${p => p.theme.button.fontSize};
  line-height: ${p => p.theme.button.lineHeight};
  text-decoration: none;
  border: 0;
  border-radius: ${p => p.theme.button.radius};
  outline: 0;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  position: relative;
  ${unselectable};
  &::-moz-focus-inner {
    border: 0;
  }

  ${({ theme: { button }, mode, disabled }) => {
    // strong mode (disabled + enabled)
    if (mode === 'strong') {
      return disabled
        ? `
          color: ${button.modeStrongDisabledColor};
          background: ${button.modeStrongDisabledBackground};
        `
        : `
          color: ${button.modeStrongColor};
          background: ${button.modeStrongBackground};
        `
    }
    // normal mode (disabled + enabled)
    return disabled
      ? `
        color: ${button.modeNormalDisabledColor};
        background: ${button.modeNormalDisabledBackground};
      `
      : `
        color: ${button.modeNormalColor};
        background: ${button.modeNormalBackground};
      `
  }}
`

export default Button
