import React from 'react'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Button',
}

// eslint-disable-next-line
const Button = ({ children, ...props }: any): any => <button {...props}>{children}</button>

export const text = () => <Button onClick={action('clicked')}>Hello Button</Button>

export const emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
)
