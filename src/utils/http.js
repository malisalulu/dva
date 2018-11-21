import axios from 'axios'
import { message, Button } from 'antd';
import Qs from 'qs';
import { addCookie, getCookie, delCookie } from './myCookie';
var config = require('./config')
var paths = config.getPaths();


export const ajaxPost = function(url, params, callback, err, isQuery) {
	params.ssid = getCookie("m_access_ssid") || paths.ssid;
	params.sid = params.sid || getCookie("m_access_ssid") || paths.ssid;
	params.subSystem = paths.subSystem;
	var data = {
		method: 'post',
		url: url,
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	};
	if(isQuery) {
		data.params = params;
	} else {
		data.data = params;
	}
	axios(data).then(function(res) {
		callback(res);
	}).catch(function(error) {
		if(err) {
			callback('error');
		}
	});
};
export const ajaxGet = function(url, params, callback, err) {
	params.ssid = getCookie("m_access_ssid") || paths.ssid;
	params.sid = params.sid || getCookie("m_access_ssid") || paths.ssid;
	params.subSystem = paths.subSystem;
	axios.get(url, {
		params: params
	}).then(function(res) {
		callback(res);
	}).catch(function(error) {
		if(err) {
			callback('error');
		}
	})
};

/**此方法只为登录使用**/
export const ajaxLogin = function(url, params, callback) {
	//	params.ssid = envConfig.sid;
	axios({
		method: 'post',
		url: url,
		data: Qs.stringify(params)
	}).then(function(res) {
		callback(res);
	}).catch(function(error) {
		callback(error);
	});
};

axios.defaults.timeout = 15000;

//请求拦截器
axios.interceptors.request.use(function(data) {
	//判断是不是登录接口，如果是登录接口 不需要token 继续请求；如果不是，阻止请求
	if(data.url.indexOf(paths.ssopath) > -1 || data.noToken) {
		//continue
	} else {
		data.headers['Content-Type'] = 'application/json;charset=UTF-8';
		let m_access_token = getCookie('m_access_token')
		if(m_access_token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
			data.headers.Authorization = m_access_token;
		} else {
			return Promise.reject();
		}
	}
	if(config.showLogs === 1) {
		console.log("接口地址-->" + data.url);
		if(data.params) {
			console.log("传入参数-->" + JSON.stringify(data.params));
		} else {
			console.log("传入参数-->" + data.data);
		}
	}
	return data;
}, function(error) {
	return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use(
	response => {
		if(config.showLogs === 1) {
			console.log("返回数据-->" + JSON.stringify(response.data));
		}
		if(response.config.url.indexOf(paths.ssopath) > -1) { //如果是登录接口，不处理异常

		} else {
			var code = response.data.code;
			if(code && code !== 200) {
				if(code === 401) { //401 未登录
					delCookie('m_access_token');
					delCookie('m_refresh_token');
					window.location.href = '/user/login';
				} else if(code === 400) {
					message.error(response.data.msg);
				} else {
					message.error(response.msg);
				}
				return Promise.reject(response.data);
			}
		}
		return response.data;
	},
	error => {
		message.error('网络异常，请求失败，请稍后再试');
		return Promise.reject(error)
	});
