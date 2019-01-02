import React, { useState } from 'react'
import TabBar from './TabBar'

const items = ['Banana', 'Strawberry', 'Cherry']

export default () => {
  const [selected, setSelected] = useState(0)
  return (
    <div
      css={`
        display: flex;
        justify-content: center;
        width: 50%;
        margin: 100px auto;
      `}
    >
      <TabBar selected={selected} items={items} onChange={setSelected} />
    </div>
  )
}
