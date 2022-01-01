const path = require('path');
const basePath = path.resolve(__dirname, '../', 'packages');

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
