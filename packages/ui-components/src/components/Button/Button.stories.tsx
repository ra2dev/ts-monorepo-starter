import React from 'react'
import Button from './'

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Button Title',
  info: { inline: true, header: false },
  component: Button,
  parameters: {
    componentSubtitle: 'To trigger an operation.',
  },
}

export const text = () => <Button>Hello Button</Button>
