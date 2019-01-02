import React, { useState } from 'react'
import Slider from './Slider'

export default () => {
  const [value, setValue] = useState(0.3)
  return (
    <div
      css={`
        width: 50%;
        margin: 100px auto;
      `}
    >
      <div
        css={`
          display: flex;
          justify-content: center;
          margin: 0 0 20px;
          font-size: 24px;
          color: rgba(45, 55, 71, 0.5);
        `}
      >
        <div>{Math.round(value * 100)}%</div>
      </div>
      <Slider value={value} onChange={setValue} />
    </div>
  )
}
