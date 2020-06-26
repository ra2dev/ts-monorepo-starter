const path = require('path')
const { lstatSync, readdirSync } = require('fs')

const basePath = path.resolve(__dirname, '../', 'packages')
const packages = readdirSync(basePath).filter((name) => lstatSync(path.join(basePath, name)).isDirectory())

module.exports = async ({ config }) => {
	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		use: [
			{
				loader: require.resolve('babel-loader'),
			},
			{
				loader: require.resolve('react-docgen-typescript-loader'),
			},
		],
		exclude: /(node_modules)/,
	})

	config.resolve.extensions.push('.ts', '.tsx')

	Object.assign(config.resolve.alias, {
		...packages.reduce(
			(acc, name) => ({
				...acc,
				[`@monoprefix/${name}`]: path.join(basePath, name, 'src'),
			}),
			{}
		),
	})

	return config
}
