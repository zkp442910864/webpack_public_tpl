common.init();
import '@css/index.scss';

// console.log(common);
// console.log(ajax);
// ajax.get('123', {}, {a: 1, isLoad: true});

(() => {
	var scale = 1 / window.devicePixelRatio;
	document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

	var deviceWidth = document.documentElement.clientWidth;
	// if(deviceWidth > 1920) deviceWidth = 1920;
	// document.documentElement.style.fontSize = deviceWidth / 19.2+ 'px';
	document.documentElement.style.fontSize = 100 * deviceWidth / 1920+ 'px';
})();


common.reactJs().then(({React, ReactDom}) => {
	const {useState, useEffect} = React;
	const query = common.getQuery();


	const MyDiv = () => {

		const [ajaxData, setAjaxData] = useState({qrCode: {}});
		const [state, setState] = useState(false);

		useEffect(() => {
			if (state) return;
			if (!query.id) {
				alert('缺少设备id');
				return;
			}
			ajax.get('xxx', {arkId: query.id}, {isLoad: true}).then((res) => {
				if (res.msg) {
					alert(res.msg);
					return;
				}
				setState(true);
				res.qrCode = JSON.parse(res.qrCode || '{}');
				setAjaxData(res);
			}).catch((error) => {
				alert('出错');
			});
		}, [ajaxData]);


		return (
			<div className="rel box">
				<div className="header">
					<img src={require('@img/top_bg.png')} alt=""/>
					<div className="right">
						服务热线 {ajaxData.phone || '--'}
					</div>
				</div>
				<div className="content abs">
					<div className="left qs">
						<div>投餐</div>
						{ajaxData.qrCode['1'] ? <img src={ajaxData.qrCode['1']} alt=""/> : '...'}
					</div>
					<div className="left yh">
						<div>取餐</div>
						{ajaxData.qrCode['2'] ? <img src={ajaxData.qrCode['2']} alt=""/> : '...'}
					</div>
				</div>
			</div>
		)
	}
	
	ReactDom.render(<MyDiv/>, document.getElementById('app'));
});
