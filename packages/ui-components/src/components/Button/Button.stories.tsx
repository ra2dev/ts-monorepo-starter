import React from 'react'
import Button from './index'

export default {
  title: 'Button Title',
  info: { inline: true, header: false },
  component: Button,
  parameters: {
    componentSubtitle: 'To trigger an operation.',
  },
}

export const text = () => <Button>Hello Button</Button>
