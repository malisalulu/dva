//myEnv 打包环境切换  0--开发环境  1--测试环境  2--正式环境
var myEnv =0

//是否显示日志 0--不显示 1--显示
var showLogs = 0;

//cookie有效期 30分钟
var cookieExpires = 24 * 60 * 60 * 1000;

function getPaths() {
	var _packpath = ''; //打包地址
	var _ssopath = ''; //登录服务地址
	var _authpath = ''; // 权限服务地址
	var _mbpath = ''; //中台基础服务地址
  var _domain = '';
	if(myEnv === 2) {} else if(myEnv === 1) {
    _packpath = '';
  	_ssopath = '';
  	_authpath = '';
  	_mbpath = '';
	} else if(myEnv === 0) {
    _packpath = '';
  	_ssopath = 'https://www.easy-mock.com/mock/5bee5d12a0bcc01c54df54d1/api';
  	_authpath = '';
  	_mbpath = ' https://www.easy-mock.com/mock/5bee24e66b3691268016a040/example';
	};
	var obj = {
		packpath: _packpath,
		ssopath: _ssopath,
		authpath: _authpath,
		mbpath: _mbpath,
    domain:_domain
	};
	return obj;
}

module.exports = {
	myEnv: myEnv,
	showLogs: showLogs,
	cookieExpires: cookieExpires,
	getPaths: getPaths,
}
