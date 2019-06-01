
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 处理html

const {filesPath} = require('../config');

const path = require("path");

const routes = require('./routes');

const {topTpl, bottomTpl, commonTemplate} = require('./layout');

const defaultCustom = {
	topTpl: topTpl(),
	commonTemplate: commonTemplate(),
	bottomTpl: bottomTpl()
};

/**
 * common  公共文件的名字
 */
const [common, templateArr, entry, copyFiles] = ['common', [], {}, []];

routes.forEach((item) => {
	const filename = `${item.entryKey}.html`;
	const template = path.resolve(__dirname, '..', filesPath.viewUrl, `${item.entryKey}.ejs`);
	const custom = Object.assign({}, defaultCustom, item.custom);

	templateArr.push(new HtmlWebpackPlugin({
		filename,
		template,
		custom,
		// favicon: './src/assets/img/favicon.ico',
		inject: true,
		hash: true,
		minify: {
			removeComments: true,
			collapseWhitespace: true,
		},
		chunks: ['vendors', common, item.entryKey],
	}));

	entry[item.entryKey] = path.resolve(__dirname, '..', filesPath.sourcesUrl, filesPath.default[1], `${item.entryKey}.${filesPath.defaultSuffix[2]}`);
});


module.exports = { common, template: templateArr, entry, copyFiles };