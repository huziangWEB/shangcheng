/*
* @Author: huziangWEB
* @Date:   2019-01-24 23:20:00
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-01-25 21:54:24
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
	data : {
		username : '',
		question : '',
		answer : '',
		token : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			if(username){
				_user.getQuestion(username, function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQusetion();
				}, function(errMsg){
					formError.show(errMsg)
				});
			}else{
				formError.show('请输入用户名');
			}
		});

		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if(answer){
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer : answer
				}, function(res){
					_this.data.answer = answer;
					_this.data.token = token;
					_this.loadStepPassword();
				}, function(errMsg){
					formError.show(errMsg)
				});
			}else{
				formError.show('请输入密码提示问题的答案');
			}
		});

		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			if(password && password.length>=6){
				_user.resetPassword({
					username : _this.data.username,
					passwordNew : password,
					forgetToken : _this.data.token
				}, function(res){
					window.location.href = './result.html?type=pass-reset';
				}, function(errMsg){
					formError.show(errMsg)
				});
			}else{
				formError.show('请输入不少于6新密码');
			}
		});

	},
	// 加载输入用户名的一步
	loadStepUsername : function(){
		$('.step-username').show();
	},
	// 加载输入问题的一步
	loadStepQusetion : function(){
		formError.hide();
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('.question').text(this.data.question);
	},
	// 加载输入密码的一步
	loadStepPassword : function(){
		formError.hide();
		$('.step-question').hide()
			.siblings('.step-password').show();
	}
};
$(function(){
	page.init();
});

