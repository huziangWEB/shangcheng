/*
* @Author: huziangWEB
* @Date:   2019-01-25 21:58:25
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-01-25 22:34:52
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
	},
	onload : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function(errMsg){
			_mm.errorTips(errMsg);
		})
	}
};
$(function(){
	page.init();
});