import ljharbConfig from '@ljharb/eslint-config/flat';

export default [
	...ljharbConfig,
	{
		rules: {
			'func-style': 'warn',
		},
	},
	{
		files: ['test/**/*.js'],
		rules: {
			'max-lines-per-function': 'off',
		},
	},
	{
		files: ['**/*.md/*.js'],
		languageOptions: {
			ecmaVersion: 2022,
			parserOptions: {
				allowReserved: false,
			},
		},
	},
];
