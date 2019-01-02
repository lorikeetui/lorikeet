import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { noop } from '../../utils'
import { font, unselectable } from '../../styles'
import Theme from '../Theme/Theme'

class TabBar extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.node).isRequired,
    selected: PropTypes.number,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    selected: 0,
    onChange: noop,
  }
  state = {
    displayFocusRing: false,
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  }
  enableFocusRing() {
    this.setState({ displayFocusRing: true })
  }
  disableFocusRing() {
    this.setState({ displayFocusRing: false })
  }
  selectElement(element) {
    if (!element || !this.barElement) {
      return
    }
    const index = [...this.barElement.childNodes].indexOf(element)
    if (index > -1) {
      this.props.onChange(index)
    }
  }
  handleMouseDown = () => {
    this.disableFocusRing()
  }
  handleKeydown = ({ key }) => {
    if (key === 'Enter') {
      this.selectElement(document.activeElement)
      this.enableFocusRing()
    }
    if (key === 'Tab') {
      this.enableFocusRing()
    }
  }
  handleTabMouseDown = ({ currentTarget }) => {
    // We would usually avoid using the DOM when possible, and prefer using a
    // separate component (`Tab`) to keep the `index` in a prop, then pass it
    // using an event prop. But since `this.selectElement()` is needed (so we
    // can pass `document.activeElement` to it for the keyboard), and we have
    // `e.currentTarget` in the event object, we might as well use it for the
    // pointer device too.
    this.selectElement(currentTarget)
  }
  handleBarRef = el => {
    this.barElement = el
  }
  render() {
    const { displayFocusRing } = this.state
    const { items, selected } = this.props
    return (
      <Theme>
        {({ themeGroups }) => {
          const theme = themeGroups(['general', 'tabBar'])
          return (
            <nav onMouseDown={this.handleMouseDown}>
              <Bar ref={this.handleBarRef} theme={theme}>
                {items.map((item, i) => (
                  <Tab
                    key={i}
                    tabIndex="0"
                    selected={i === selected}
                    focusRing={displayFocusRing}
                    onMouseDown={this.handleTabMouseDown}
                  >
                    <Label theme={theme} selected={i === selected}>
                      {item}
                    </Label>
                    {displayFocusRing && <FocusRing theme={theme} />}
                  </Tab>
                ))}
              </Bar>
            </nav>
          )
        }}
      </Theme>
    )
  }
}

const Bar = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid ${p => p.theme.tabBar.borderColorNormal};
`

const FocusRing = styled.span`
  display: none;
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid ${p => p.theme.general.colorFocus};
  border-radius: 2px;
`

const Tab = styled.li`
  position: relative;
  list-style: none;
  padding: 0 30px;
  cursor: pointer;
  ${unselectable()};
  &:focus {
    outline: 0;
    ${FocusRing} {
      display: block;
    }
  }
`

const Label = styled.span`
  display: flex;
  margin-bottom: -1px;
  padding: 5px 0 3px;
  border-bottom: 4px solid
    ${p => (p.selected ? p.theme.tabBar.borderColorActive : 'transparent')};
`

export default TabBar
