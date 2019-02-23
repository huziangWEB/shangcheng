/*
* @Author: huziangWEB
* @Date:   2019-02-22 23:28:57
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-23 00:07:46
*/
'use strict'
require('./index.css');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
const _mm = require('util/mm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');



var page = {
	data: {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init : function(){
		this.onload();
	},
	onload : function(){	
		this.loadPaymentInfo();
	},
	// 加载订单列表
	loadPaymentInfo: function(){
		var _this = this,
			paymentHtml = '',
			$pageWrap = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>')
		_payment.getPaymentInfo(this.data.orderNumber, function(res){
			paymentHtml = _mm.renderHtml(templateIndex, res);
			$pageWrap.html(paymentHtml);
			_this.listenOrderStatus();
		}, function(errMsg){
			$pageWrap.html('<p class="err-tip">'+ errMsg +'</p>')
		});
	},
	// 监听订单状态
	listenOrderStatus: function(){
		var _this = this;
		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber, function(res){
				if(res == true){
					window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
				}
			})
		}, 5e3)
	}
};
$(function(){
	page.init();
});