const config = {
	/* package.json 里配置 --mode 三种模式
		none 本地
		development 开发
		production	生产
		process.env.NODE_ENV 通过 process 这个全局变量取到 
	*/
	dev: {
		// 全局文件的引入路径
		publicPath: '/',
		// 静态文件里的引入路径
		staticPublicPath: '/'
	},
	none: {
		publicPath: 'http://www.demo.zz/webpack/webpack_typescript/dist/',
		staticPublicPath: 'http://www.demo.zz/webpack/webpack_typescript/dist/'
	},
	build: {
		// 单层结构目录文件的可以用相对路径 (就是所有的页面属于同级的)
		publicPath: './',
		staticPublicPath: '../../'

		// 多层结构目录文件根据服务器的配置路径来（目前的解决方法）
		// publicPath: 'http://www.demo.zz/webpack/webpack_typescript/dist/',
		// staticPublicPath: 'http://www.demo.zz/webpack/webpack_typescript/dist/'
	}
};

module.exports = {
	config,
	// 输出的资源文件路径
	returnPath: (files, name) => {
		// if (files === 'js') {
		// 	return `static/${files}/[name].js`;
		// } else {
		// 	return `static/${files}/[name].[hash:7].[ext]`;
		// }
		switch (true) {
			case files === 'js':
				return `static/${files}/[name].js`;
			case files === 'css' && name:
				return `static/${files}/${name}.css`;
			case files === 'css':
				return `static/${files}/[name].css`;
			default:
				return `static/${files}/[name].[hash:7].[ext]`;
		}
	},
	// 输出资源文件的路径, 分页面内路径 和 css内的路径
	returnPublicPath (NODE_ENV, type) {
		switch (NODE_ENV) {
			case 'development':
				return config.dev[type];
			case 'none':
				return config.none[type];
			case 'production':
				return config.build[type];
		}
	},
	filesPath: {
		// 文件的路径
		initUrl: 'router/initFiles', // 模板文件
		viewUrl: 'src/view/', // 视图文件
		sourcesUrl: 'src/assets', // 资源文件
		default: ['css', 'js'], // 生成文件的存放目录文件夹
		defaultSuffix: ['ejs', 'scss', 'js'], // 必须和initUrl 里的文件对应起来
	}
};
