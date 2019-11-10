import React from 'react'

const b: any = {}

export default function Button() {
  const aa = b?.d?.g?.g?.()
  return (
    <button type="button" disabled>
      HELLO WORLD BUTTON {aa}
    </button>
  )
}
