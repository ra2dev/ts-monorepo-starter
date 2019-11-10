module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'clover'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	globals: {
		'ts-jest': {
			extends: './babel.config.js',
		},
	},
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	modulePathIgnorePatterns: ['dist'],
	moduleNameMapper: {
		'@monoprefix/(.+)$': '<rootDir>packages/$1/src',
		'\\.(css|less|sass|scss)$': '<rootDir>/jest/__mocks__/styleMock.js',
	},
	notify: true,
	notifyMode: 'always',
	roots: ['<rootDir>packages'],
	testMatch: ['**/__tests__/*.(spec|test).(ts|tsx|js|jsx)', '**/*.(spec|test).(ts|tsx|js|jsx)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
}
