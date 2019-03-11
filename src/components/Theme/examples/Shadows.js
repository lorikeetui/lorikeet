import React, { useState } from 'react'
import styled from 'styled-components'
import { Slider, Checkbox, Theme, unselectable } from '@lorikeet/ui'

const LEVELS = [0, 2, 4, 24]

const App = () => {
  const [liveMode, setLiveMode] = useState(false)
  const [dropShadow, setDropShadow] = useState(true)
  const [snapToLevels, setSnapToLevels] = useState(true)
  const [liveElevation, setLiveElevation] = useState(0)
  const elevation = Math.round(liveElevation * 24 * 100) / 100
  return (
    <Theme>
      {({ themeGroup }) => {
        const theme = themeGroup('general')
        return (
          <div>
            <div
              css={`
                position: absolute;
                top: 0;
                right: 0;
                padding: 10px 0;
                background: #fff;
                border: 0.5px solid #ccc;
              `}
            >
              <CheckOption
                label="Live mode"
                checked={liveMode}
                onChange={setLiveMode}
              />
              <CheckOption
                label="drop-shadow()"
                checked={dropShadow}
                onChange={setDropShadow}
              />
            </div>
            {!liveMode && (
              <div
                css={`
                  display: grid;
                  grid-template-columns: repeat(4, 248px);
                  grid-auto-flow: row;
                  justify-content: center;
                  grid-gap: 40px;
                  align-content: center;
                  width: 100vw;
                  min-height: 100vh;
                `}
              >
                {LEVELS.map(v => (
                  <ShadowCard
                    key={v}
                    size={248}
                    elevation={v}
                    dropShadow={dropShadow}
                  />
                ))}
              </div>
            )}
            {liveMode && (
              <div
                css={`
                  display: grid;
                  grid-auto-flow: row;
                  justify-content: center;
                  align-content: center;
                  grid-gap: 40px;
                  width: 100vw;
                  min-height: 100vh;
                `}
              >
                <div
                  css={`
                    position: absolute;
                    top: 10px;
                    left: 10px;
                  `}
                >
                  {dropShadow
                    ? theme.dropShadow(elevation)
                    : `box-shadow: ${theme.boxShadow(elevation)}`}
                </div>
                <ShadowCard
                  size={248}
                  elevation={elevation}
                  dropShadow={dropShadow}
                />
                <Slider value={liveElevation} onChange={setLiveElevation} />
              </div>
            )}
          </div>
        )
      }}
    </Theme>
  )
}

const ShadowCard = ({ size, elevation, dropShadow }) => (
  <Theme>
    {({ themeGroup }) => {
      const theme = themeGroup('general')
      const style = dropShadow
        ? { filter: theme.dropShadow(elevation) }
        : {
            boxShadow: theme.boxShadow(elevation),
          }
      return (
        <div
          css={`
            width: ${size}px;
            height: ${size}px;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #cecece;
            background: #fff;
            font-size: 30px;
            font-weight: 300;
          `}
          style={style}
        >
          {elevation}
        </div>
      )
    }}
  </Theme>
)

const CheckOption = ({ label, checked, onChange }) => (
  <label
    css={`
      display: block;
      padding: 10px 20px;
      cursor: pointer;
      ${unselectable};
    `}
  >
    <Checkbox checked={checked} onChange={onChange} />
    <span css="margin-left: 5px">{label}</span>
  </label>
)

export default App
