
module.exports = {
	commonTemplate () {
		return `<div>qqq123123eee</div>`;
	},

	topTpl: ({ title = '', description = '1', author = '1', keywords = '1', routes = [] } = {}) => {
		const a = [];
		routes.forEach(item => {
			a.push(`<a href="./${item.entryKey}.html">${item.entryKey}</a>`);
		});
		return `
			<!DOCTYPE html>
			<html>
			<head>
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
			<div>${a.join('  ')}</div>
			<div id="app"></div>
		`;
	},

	bottomTpl: () => {
		return `
			</body>
			</html>
		`;
	}
};
