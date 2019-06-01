


const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// 清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
	return merge(common(env), {
		plugins: [
			new CleanWebpackPlugin()
		]
	});
};