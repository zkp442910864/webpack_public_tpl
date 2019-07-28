
module.exports = {
	// 公共
	commonTemplate () {
		return ``;
	},

	// 头部
	topTpl: ({ title = '', description = '1', author = '1', keywords = '1', routes = [], NODE_ENV = '', otherMeta = '' } = {}) => {
		// console.log(2, NODE_ENV === 'development');
		const nav = [];
		if (NODE_ENV === 'development') {
			routes.forEach(item => {
				nav.push(`<a href="./${item.entryKey}.html">${item.entryKey}</a>`);
			});
		}
		
		return `
			<!DOCTYPE html>
			<html>
			<head>
				${otherMeta}
				<meta charset="utf-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<title>${title}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<meta name="description" content="${description}">
				<meta name="author" content="${author}">
				<meta name="keywords" content="${keywords}">
				<link id="link-icon" rel="icon" href="" type="image/x-icon"/>
			</head>
			<body>
			<div>${nav.join('  ')}</div>
			<div id="app"></div>
		`;
	},

	// 底部
	bottomTpl: () => {
		return `
			</body>
			</html>
		`;
	}
};
