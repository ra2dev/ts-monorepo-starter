import { configure } from '@storybook/react'
// automatically import all files ending in *.stories.js
configure(
	[require.context('../packages', true, /\.stories\.tsx?$/), require.context('../docs', true, /\.stories\.mdx?$/)],
	module
)
