/*
* @Author: huziangWEB
* @Date:   2019-01-25 22:02:58
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-01-26 22:59:28
*/
'use strict'
const _mm = require('util/mm.js');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
var navSide = require('page/commons/nav-side/index.js');
var _user = require('service/user-service.js');
require('./index.css');
var templateIndex = require('./index.string');



var page = {
	init : function(){
		this.onload();
		this.bindEvent();
	},
	onload : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				phone : $.trim($('#phone').val()),
				email : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer : $.trim($('#answer').val())
			},
			validateResult = _this.validateFrom(userInfo);
			if(validateResult.status){
				_user.updateUserInfo(userInfo, function(res, msg){
					_mm.successTips(msg);
					window.location.href='./user-center.html';
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function(errMsg){
			_mm.errorTips(errMsg);
		})
	},
	validateFrom : function(formData){
		var result = {
			status : false,
			msg : ''
		};

		if(!_mm.validate(formData.phone, 'require')){
			result.msg = '手机号不能为空';
			return result;
		}
		if(!_mm.validate(formData.email, 'require')){
			result.msg = '邮箱不能为空';
			return result;
		}
		if(!_mm.validate(formData.phone, 'phone')){
			result.msg = '手机号格式不正确';
			return result;
		}
		if(!_mm.validate(formData.email, 'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}
		if(!_mm.validate(formData.question, 'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if(!_mm.validate(formData.answer, 'require')){
			result.msg = '密码答案不能为空';
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