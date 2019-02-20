/*
* @Author: huziangWEB
* @Date:   2019-02-19 18:18:16
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-20 14:21:56
*/
'use strict'

require('./index.css');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _cart = require('service/cart-service.js');

var page = {
	data:{
		
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadCart();
	},
	bindEvent: function(){
		var _this = this;
	
	},
	loadCart: function(){
		var _this = this,
			html = '',
			$pageWrap = $('.page-wrap');

		$pageWrap.html('<div class="loading"></div>')

	},
	//数据匹配
	filter: function(data){
		data.subImages = data.subImages.split(',');
	}
};
$(function(){
	page.init();
});