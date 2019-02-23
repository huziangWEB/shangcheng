/*
* @Author: huziangWEB
* @Date:   2019-02-19 18:18:16
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-22 01:01:14
*/
'use strict'

require('./index.css');
require('page/commons/header/index.js');
var nav = require('page/commons/nav/index.js');
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
		// 商品的选择和取消选择
		$(document).on('click', '.cart-select', function(){
			var $this = $(this),
				productId = $this.parents('.cart-table').data('product-id');

			if($this.is(':checked')){
				_cart.selectProduct(productId, function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				})
			}else{
				_cart.unselectProduct(productId, function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				})
			}

		});
		// 商品的全选和取消选择
		$(document).on('click', '.cart-select-all', function(){
			var $this = $(this);

			if($this.is(':checked')){
				_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				})
			}else{
				_cart.unselectAllProduct(function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				})
			}

		});

		// 商品数量的变化
		$(document).on('click', '.count-btn', function(){
			var $this = $(this),
				$pCount = $this.siblings('.count-input'),
				currCount = parseInt($pCount.val()),
				type = $this.hasClass('plus') ? 'plus' : 'minus',
				productId = $this.parents('.cart-table').data('product-id'),
				minCount = 1,
				maxCount = parseInt($pCount.data('max')),
				newCount = 0;
			if(type === 'plus'){
				if(currCount >= maxCount){
					_mm.errorTips('该商品数量已到达上限');
					return;
				}
				newCount = currCount + 1;
			}else if(type == 'minus'){
				if(currCount <= minCount){
					return;
				}
				newCount = currCount - 1;
			}
			// 更新购物车数量
			_cart.updateProduct({
				productId: productId,
				count: newCount
			}, function(res){
				_this.renderCart(res);
			}, function(errMsg){
				_this.showCartError();
			});
		});
		// 删除单个商品
		$(document).on('click', '.cart-delete', function(){
			if(window.confirm('确定要删除该商品？')){
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		// 删除选中商品
		$(document).on('click', '.delete-selected', function(){
			if(window.confirm('确定要删除选中的商品？')){
				var arrProductIds = [],
					$selectedItem = $('.cart-select:checked');
				// 循环查找选中的productIds
				for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
					arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
				}
				if(arrProductIds.length){
					_this.deleteCartProduct(arrProductIds.join(','));
				}else{
					_mm.errorTips('您还没选中要删除的商品');
				}		
			}
		});
		// 提交购物车
		$(document).on('click', '.btn-submit', function(){
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
				window.location.href = './order-confirm.html';
			}else{
				_mm.errorTips('请选择商品后再提交');
			}
		})
	},
	loadCart: function(){
		var _this = this;
		_cart.getCartList(function(res){
			_this.renderCart(res);
		}, function(errMsg){
			_this.showCartError();
		})

	},

	renderCart: function(data){
		this.filter(data);
		this.data.cartInfo = data;

		var cartHtml = _mm.renderHtml(templateIndex, data);
		$('.page-wrap').html(cartHtml);

		nav.loadCartCount();
	},
	// 删除制定商品，支持批量，productId用逗号分隔
	deleteCartProduct: function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds, function(res){
			_this.renderCart(res);
		}, function(errMsg){
			_this.showCartError();
		})
	},
	//数据匹配
	filter: function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	showCartError: function(){
		$('.page-wrap').html('<p class="err-tip">哪里不对了，刷新试试吧</p>')
	}
};
$(function(){
	page.init();
});