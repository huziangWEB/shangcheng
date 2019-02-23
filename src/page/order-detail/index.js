/*
* @Author: huziangWEB
* @Date:   2019-02-22 21:04:38
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-22 23:48:05
*/
'use strict'
require('./index.css');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
const _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var navSide = require('page/commons/nav-side/index.js');
var templateIndex = require('./index.string');



var page = {
	data: {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init : function(){
		this.onload();
		this.bindEvent();
	},
	onload : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'order-list'
		});
		this.loadDetial();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click', '.order-cancel', function(){
			if(window.confirm('要取消订单吗')){
				_order.cancelOrder(_this.data.orderNumber, function(res){
					_mm.successTips('该订单取消成功');
					_this.loadDetail();
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			
		})
	},
	// 加载订单列表
	loadDetial: function(){
		var _this = this,
			orderDetailHtml = '',
			$content = $('.content');
		$content.html('<div class="loading"></div>')
		_order.getOrderDetail(this.data.orderNumber, function(res){
			_this.dataFilter(res);
			orderDetailHtml = _mm.renderHtml(templateIndex, res);
			$content.html(orderDetailHtml);

		}, function(errMsg){
			$content.html('<p class="err-tip">'+ errMsg +'</p>')
		});
	},
	dataFilter: function(data){
		data.needPay = data.status == 10;
		data.isCancelable = data.status == 10;
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