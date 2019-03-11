import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spring, animated } from 'react-spring/renderprops'
import { noop } from '../../utils'
import { springs, unselectable } from '../../styles'

const BAR_HEIGHT = 6
const HANDLE_SIZE = 24
const HANDLE_SHADOW_MARGIN = 15
const PADDING = 5
const MIN_WIDTH = HANDLE_SIZE * 10
const HEIGHT = Math.max(HANDLE_SIZE, BAR_HEIGHT) + PADDING * 2

class Slider extends React.Component {
  static propTypes = {
    /** The current value of the slider, between 0 and 1. */
    value: PropTypes.number,

    /** A request to update the value, passing a number between 0 and 1. */
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: 0,
    onChange: () => {},
  }

  state = {
    pressed: false,
  }

  componentWillUnmount() {
    this.dragStop()
  }

  handleRef = element => {
    this._mainElement = element
    this._document = element && element.ownerDocument
  }

  getRect = () => {
    const now = Date.now()

    // Cache the rect if the last poll was less than a second ago
    if (this._lastRect && now - this._lastRectTime < 1000) {
      return this._lastRect
    }

    this._lastRectTime = now
    this._lastRect = this._mainElement
      ? this._mainElement.getBoundingClientRect()
      : new window.DOMRect()

    return this._lastRect
  }

  clientXFromEvent(event) {
    return (event.touches ? event.touches.item(0) : event).clientX
  }

  updateValueFromClientX(clientX) {
    const rect = this.getRect()
    const x = Math.min(rect.width, Math.max(0, clientX - rect.x))
    this.props.onChange(x / rect.width)
  }

  dragStart = event => {
    this.dragStop()
    const clientX = this.clientXFromEvent(event)
    this.setState({ pressed: true }, () => {
      this.updateValueFromClientX(clientX)
    })
    this._document.addEventListener('mouseup', this.dragStop)
    this._document.addEventListener('touchend', this.dragStop)
    this._document.addEventListener('mousemove', this.dragMove)
    this._document.addEventListener('touchmove', this.dragMove)
  }

  dragStop = () => {
    this.setState({ pressed: false })
    this._document.removeEventListener('mouseup', this.dragStop)
    this._document.removeEventListener('touchend', this.dragStop)
    this._document.removeEventListener('mousemove', this.dragMove)
    this._document.removeEventListener('touchmove', this.dragMove)
  }

  dragMove = event => {
    if (!this.state.pressed) {
      return
    }

    this.updateValueFromClientX(this.clientXFromEvent(event))
  }

  getHandleStyles(pressProgress) {
    return {
      transform: pressProgress.interpolate(
        t => `translate3d(0, calc(${t}px - 50%), 0)`
      ),
      boxShadow: pressProgress.interpolate(
        t => `0 4px 8px 0 rgba(0, 0, 0, ${0.13 * (1 - t)})`
      ),
      background: pressProgress.interpolate(
        t => `hsl(0, 0%, ${100 * (1 - t * 0.01)}%)`
      ),
    }
  }

  getHandlePositionStyles(value) {
    return {
      transform: value.interpolate(
        t => `translate3d(calc(${t * 100}% + ${HANDLE_SHADOW_MARGIN}px), 0, 0)`
      ),
    }
  }

  getActiveBarStyles(value, pressProgress) {
    return {
      transform: value.interpolate(t => `scaleX(${t}) translateZ(0)`),
      background: pressProgress.interpolate(
        t => `hsl(179, ${Math.round(76 * (1 + 0.2 * t))}%, 48%)`
      ),
    }
  }

  render() {
    const { pressed } = this.state
    const value = Math.max(0, Math.min(1, this.props.value))
    return (
      <Spring
        config={springs.swift}
        to={{
          pressProgress: Number(pressed),
          value,
        }}
        native
      >
        {({ value, pressProgress }) => (
          <Main>
            <Area
              ref={this.handleRef}
              onMouseDown={this.dragStart}
              onTouchStart={this.dragStart}
            >
              <Bars>
                <BaseBar />
                <ActiveBar
                  pressed={pressed}
                  style={this.getActiveBarStyles(value, pressProgress)}
                />
              </Bars>

              <HandleClip>
                <HandlePosition
                  style={this.getHandlePositionStyles(value, pressProgress)}
                >
                  <Handle
                    pressed={pressed}
                    style={this.getHandleStyles(pressProgress)}
                  />
                </HandlePosition>
              </HandleClip>
            </Area>
          </Main>
        )}
      </Spring>
    )
  }
}

const Main = styled.div`
  min-width: ${MIN_WIDTH}px;
  padding: 0 ${HANDLE_SIZE / 2 + PADDING}px;
  ${unselectable};
`

const Area = styled.div`
  position: relative;
  height: ${HEIGHT}px;
  cursor: pointer;
`

const Bars = styled(animated.div)`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
  border-radius: 2px;
  height: ${BAR_HEIGHT}px;
`

const Bar = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const BaseBar = styled(Bar)`
  background: #edf3f6;
`

const ActiveBar = styled(Bar)`
  transform-origin: 0 0;
`

const HandleClip = styled.div`
  pointer-events: none;
  overflow: hidden;
  width: calc(100% + ${HANDLE_SIZE + HANDLE_SHADOW_MARGIN * 2}px);
  height: calc(100% + ${HANDLE_SHADOW_MARGIN * 2}px);
  transform-origin: 50% 50%;
  transform: translate(
    -${HANDLE_SIZE / 2 + HANDLE_SHADOW_MARGIN}px,
    -${HANDLE_SHADOW_MARGIN}px
  );
`

const HandlePosition = styled(animated.div)`
  width: calc(100% - ${HANDLE_SIZE + HANDLE_SHADOW_MARGIN * 2}px);
  height: 100%;
  transform-origin: 50% 50%;
`

const Handle = styled(animated.div)`
  position: absolute;
  top: 50%;
  left: 0;
  width: ${HANDLE_SIZE}px;
  height: ${HANDLE_SIZE}px;
  border: 0.5px solid #dcecf5;
  border-radius: 50%;
`

export default Slider
