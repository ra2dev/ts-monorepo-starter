const path = require('path');

const {
  lstatSync,
  readdirSync
} = require('fs');

const basePath = path.resolve(__dirname, '../', 'packages');
const packages = readdirSync(basePath).filter(name => lstatSync(path.join(basePath, name)).isDirectory()); //import { configure } from '@storybook/react'
//// automatically import all files ending in *.stories.js
//configure(
//	[require.context('../packages', true, /\.stories\.tsx?$/), require.context('../docs', true, /\.stories\.mdx?$/)],
//	module
//)
///Users/roman/opensource/ts-monorepo-starter/packages/ui-components/src/components/Button/Button.stories.tsx
module.exports = {
  addons: [],
	stories: ['../packages/ui-components/src/components/Button/Button.stories.tsx'],
  webpackFinal: async config => {
    Object.assign(config.resolve.alias, { ...packages.reduce((acc, name) => ({ ...acc,
        [`@monoprefix/${name}`]: path.join(basePath, name, 'src')
      }), {})
    });
    return config;
  },
  core: {
    builder: "webpack5"
  }
};
