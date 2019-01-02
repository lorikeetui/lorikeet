import React, { useState } from 'react'
import Button from './Button'

export default () => {
  const [clicks, setClicks] = useState(0)
  const [enabled, setEnabled] = useState(true)
  return (
    <div
      css={`
        margin: 100px auto;
        display: flex;
        justify-content: center;
        gap: 30px;
      `}
    >
      <Button
        onClick={() => setClicks(clicks + 1)}
        disabled={!enabled}
        mode="strong"
      >
        {clicks} clicks
      </Button>
      <Button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'disable' : 'enable'}{' '}
      </Button>
    </div>
  )
}
