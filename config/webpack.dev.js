


const webpack = require("webpack");
const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = (env) => {
	return merge(common(env), {
		devtool: "source-map",
		devServer: {
			publicPath: '/',
			// contentBase: path.resolve(__dirname, '..', "src/view"),
			contentBase: false,
			host: '0.0.0.0',
			useLocalIp: true, // 此选项允许浏览器使用本地IP打开。 host 必须改成0.0.0.0
			port: 3333,
			inline: true, // 改动 刷新页面
			hot: false, // 启用webpack的模块热替换特性

			/* proxy: { // 代理 如果你有单独的后端开发服务器API，并且希望在同域名下发送API请求，那么代理某些URL会很有用  貌似会影响速度
				'/api': {
					target: 'http://localhost:3000',
					pathRewrite: { '^/api': '' }, // 如果你不想始终传递/api，则需要重写路径
					secure: false, // 默认情况下，不接受运行在HTTPS上，且使用了无效证书的后端服务器。如果你想要接受，修改配置
				}
			}, */

			/* clientLogLevel: 'warning', // 当使用内联模式（内联模式）时，会在开发工具（DevTools）的控制台（控制台）显示消息
			compress: true, // 一切服务都启用gzip压缩
			hotOnly: false, // 局部热更新
			// allowedHosts: ['test.com'],
			// historyApiFallback: true, // 任意的404响应都被替代为index.html
			// https: true, // 使用了自签名证书
			open: false, // 打开浏览器
			overlay: true, // 在浏览器中显示全屏覆盖层   默认禁用  如果你想要只显示编译器错误,设置为true
			quiet: false, // 除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自的WebPack的错误或警告在控制台不可见。
			
			watchOptions: {
				poll: true
			},
			disableHostCheck: true,
			progress: true,
			// lazy: true */
		},
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [{
					loader: 'eslint-loader',
					options: {
						enforce: "pre",
						include: path.resolve(__dirname, "src"),
						formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
						emitWarning: true // 错误的报错方式 true console.warn
					}
				}]
			}, {
				test: /\.(ts|tsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: [{
					loader: 'tslint-loader',
					options: {
						// emitErrors: true,
						// failOnHint: false
					}
				}]
			}]
		},
		plugins: [
			// 开启webpack全局热更新
			// new webpack.HotModuleReplacementPlugin(),

			// 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
			// new webpack.NamedModulesPlugin(),
		]
	});
};
