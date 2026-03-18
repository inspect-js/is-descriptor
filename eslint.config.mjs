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
];
