/*
* @Author: huziangWEB
* @Date:   2019-02-22 14:11:16
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-22 16:14:49
*/
'use strict'
const _mm = require('util/mm.js');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
var navSide = require('page/commons/nav-side/index.js');
var _order = require('service/order-service.js');
require('./index.css');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');



var page = {
	data: {
		listParam: {
			pageNum: 1,
			pageSize: 5
		}
	},
	init : function(){
		this.onload();
	},
	onload : function(){
		this.loadOrderList();
		// 初始化左侧菜单
		navSide.init({
			name : 'order-list'
		});
	},
	// 加载订单列表
	loadOrderList: function(){
		var _this = this,
			orderListHtml = '',
			$listCon = $('.order-list-con');
		$listCon.html('<div class="loading"></div>')
		_order.getOrderList(this.data.listParam, function(res){
			orderListHtml = _mm.renderHtml(templateIndex,res);
			$listCon.html(orderListHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage : res.prePage,
				hasNextPage : res.hasNextPage,
				nextPage : res.nextPage,
				pageNum : res.pageNum,
				pages : res.pages
			});
		}, function(){
			$lsitCon.html('<p class="err-tip">加载订单信息失败，请刷新重试</p>')
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
	loadPagination: function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({}, pageInfo, {
			container : $('.pagination-list-con'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			}
		}));
	}
};
$(function(){
	page.init();
});