/*
* @Author: huziangWEB
* @Date:   2019-01-23 20:37:23
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-01-23 23:11:51
*/

'use strict'
require('./index.css');
require('page/commons/nav-simple/index.js')
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text();
	}
};

var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		// 验证username
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			// 如果用户名为空，不做验证
			if(!username){
				return;
			}
			// 异步验证用户名是否存在
			_user.checkUsername(username, function(res){
				formError.hide();
			}, function(errMsg){
				formError.show(errMsg);
			});
		});
		$('#submit').click(function(){
			_this.submit();
		});
		$('.user-content').keyup(function(e){
			if(e.keyCode ===13){
				_this.submit();
			}
		});
	},
	submit : function(){
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val()),
			passwordConfirm: $.trim($('#password-confirm').val()),
			phone: $.trim($('#phone').val()),
			email: $.trim($('#email').val()),
			question: $.trim($('#question').val()),
			answer: $.trim($('#answer').val())
		},
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			// 提交
			_user.register(formData, function(res){
				window.location.href ='./result.html?type=register';
			}, function(errMsg){
				formError.show(errMsg);
			});
		}else{
			formError.show(validateResult.msg);
		}
	},
	// 表单字段的验证
	formValidate : function(formData){
		var result = {
			status : false,
			msg : ''
		};
		if(!_mm.validate(formData.username, 'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(formData.password, 'require')){
			result.msg = '密码不能为空';
			return result;
		}
		if(formData.password.length < 6){
			result.msg = '密码长度不能少于6位';
			return result;
		}
		// 2次输入的密码是否一致
		if(formData.password !== formData.passwordConfirm){
			result.msg = '两次输入密码不一致';
			return result;
		}
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

