import * as http from './http'

var config = require('./config')
var myCookie = require('./myCookie')

export const paths = config.getPaths();

export const ssopath = paths.ssopath;
export const fspath = paths.fspath;



/**用户注册 检查公司全称是否存在**/
export const checkMbname = function(params,callback) {
	http.ajaxGet(paths.mbpath + '/reg/checkMbname',params,callback);
};

/**用户登录**/
export const doLogin = function(params,callback) {
	http.ajaxLogin(paths.ssopath + '/login',params,callback);
};

/**刷新token**/
export const refreshTokenFun = function(params,callback) {
	http.ajaxPut(paths.ssopath + '/v1/weblogin/refreshToken?refresh_token='+params.refreshToken,params,callback);
}

/**获取用户登录信息**/
export const getUser = function(params,callback) {
	http.ajaxGet(paths.mbpath + '/proxy',params,callback);
};

/**获取权限列表**/
export const getMenus = function(params,callback) {
	http.ajaxGet(paths.authpath + '/v1/qxusifMg/auth/menu/'+paths.ssid+'/1',params,callback);
};
