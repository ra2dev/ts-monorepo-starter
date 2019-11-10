module.exports = api => {
  api.cache(true)

  return {
    presets: [
      '@babel/env',
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV !== 'build',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-spread',
    ],
    env: {
      build: {
        ignore: ['**/*.test.tsx', '**/*.test.ts', '**/*.story.tsx', '__snapshots__', '__tests__', '__stories__'],
      },
    },
    ignore: ['node_modules'],
  }
}
