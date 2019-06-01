module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	rules: {
		"indent": ["error", "tab", { "SwitchCase": 1 }],
		"semi": ["error", "always"],
		"no-console": "error",
		"arrow-parens": 0,
		"parser": "babel-eslint",
		"no-console": "off",
	}
}