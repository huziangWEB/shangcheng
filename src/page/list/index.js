/*
* @Author: huziangWEB
* @Date:   2019-02-14 20:17:04
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-19 01:02:04
*/
'use strict'

require('./index.css');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');


var page = {
	data:{
		listParam: {
			keyword: _mm.getUrlParam('keyword') || '',
			categoryId: _mm.getUrlParam('categoryId') || '',
			orderBy: _mm.getUrlParam('orderBy') || 'default',
			pageNum: _mm.getUrlParam('pageNum') || 1,
			pageSize: _mm.getUrlParam('pageSize') || 20
		}
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadList();
	},
	bindEvent: function(){
		var _this = this;
		
		$('.sort-item').click(function(){
			var $this = $(this);
			_this.data.listParam.pageNum = 1;
			if($this.data('type') === 'default'){
				if($this.hasClass('active')){
					return;
				}else{
					$this.addClass('active').siblings('.sort-item').removeClass('active desc asc');
					_this.data.listParam.orderBy = 'default';
				}
			}

			else if($this.data('type') === 'price'){
				$this.addClass('active').siblings('.sort-item')
					.removeClass('active asc desc');
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}

			_this.loadList();
		});
	},
	loadList: function(){
		var 	_this = this,
				listHtml = '',
				listParam = this.data.listParam,
				$pListCon = $('.p-list-con');
		$pListCon.html('<div class="loading"></div>');	

		// 删除参数中不必要的字段
		listParam.catagoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		_product.getProductList(listParam, function(res){
			listHtml = _mm.renderHtml(templateIndex, {
				list : res.list
			});
			$pListCon.html(listHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage : res.prePage,
				hasNextPage : res.hasNextPage,
				nextPage : res.nextPage,
				pageNum : res.pageNum,
				pages : res.pages
			});
		}, function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	loadPagination: function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({}, pageInfo, {
			container : $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}));
	}
};
$(function(){
	page.init();
});
