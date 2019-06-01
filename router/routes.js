

const {topTpl} = require('./layout');

const routes = [
	{
		entryKey: 'index',
		custom: {
			topTpl: {
				title: '首页'
			},
		}
	},
];

routes.forEach(item => {
	item.custom.topTpl.routes = routes;
	item.custom.topTpl = topTpl(item.custom.topTpl);
});

module.exports = routes;
