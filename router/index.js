
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 处理html

const {filesPath} = require('../config');

const path = require("path");

const routes = require('./routes');

const {topTpl, bottomTpl, commonTemplate} = require('./layout');

// 都是默认的html字符串
const defaultCustom = {
	topTpl: topTpl(),
	commonTemplate: commonTemplate(),
	bottomTpl: bottomTpl()
};

module.exports = (NODE_ENV) => {
	/**
	 * common  公共文件的名字
	 */
	const [common, templateArr, entry, copyFiles] = ['common', [], {}, []];

	routes.forEach((item) => {
		// 重新设置头部的html
		item.custom.topTpl.routes = routes;
		item.custom.topTpl.NODE_ENV = NODE_ENV;
		item.custom.topTpl = topTpl(item.custom.topTpl);

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

	return { common, template: templateArr, entry, copyFiles };
};