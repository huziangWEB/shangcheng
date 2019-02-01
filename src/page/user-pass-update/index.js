/*
* @Author: huziangWEB
* @Date:   2019-01-26 23:46:21
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-01-27 00:07:49
*/
'use strict'
const _mm = require('util/mm.js');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
var navSide = require('page/commons/nav-side/index.js');
var _user = require('service/user-service.js');
require('./index.css');



var page = {
	init : function(){
		this.onload();
		this.bindEvent();
	},
	onload : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'user-pass-update'
		});
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				password : $.trim($('#password').val()),
				passwordNew : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val())
			},
			validateResult = _this.validateFrom(userInfo);
			if(validateResult.status){
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				}, function(res, msg){
					_mm.successTips(msg);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	validateFrom : function(formData){
		var result = {
			status : false,
			msg : ''
		};
		if(!_mm.validate(formData.password, 'require')){
			result.msg = '原密码不能为空';
			return result;
		}
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '密码长度不能少于6位！';
			return result;
		}
		if(formData.passwordNew !== formData.passwordConfirm){
			result.msg = '两次输入的不一致';
			return result;
		}
		
		
		// 通过验证，返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;


	}
};
$(function(){
	page.init();
});