import React, { useState } from 'react'
import { Slider } from '@lorikeet/ui'

const App = () => {
  const [value, setValue] = useState(0.5)

  return (
    <div
      css={`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
      `}
    >
      <Slider value={value} onChange={setValue} />
    </div>
  )
}

export default App
