var config = require('./config')
var expires = config.cookieExpires;
var paths = config.getPaths();

/**添加cookie**/
export const addCookie = function(name, value) {
	var exp = new Date();
	exp.setTime(exp.getTime() + expires);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=" + paths.domain + ";path=/";
};

/**获取cookie**/
export const getCookie = function(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
};

/**删除cookie**/
export const delCookie = function(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 10000);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";domain=" + paths.domain + ";path=/";
};