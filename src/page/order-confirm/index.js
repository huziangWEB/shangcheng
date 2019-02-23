/*
* @Author: huziangWEB
* @Date:   2019-02-22 01:04:10
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-22 14:01:35
*/

'use strict'
require('./index.css');
require('page/commons/header/index.js');
require('page/commons/nav/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');
var _addressModal = require('./address-modal.js');

var page = {
	data:{
		selectedAddressId : null
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent: function(){
		var _this = this;
		// 地址的选择
		$(document).on('click', '.address-item', function(){
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			_this.data.selectedAddressId = $(this).data('id');
		});
		// 订单的提交
		$(document).on('click', '.order-submit', function(){
			var shippingId = _this.data.selectedAddressId;
			if(shippingId){
				_order.createOrder({
					shippingId : shippingId
				}, function(res){
					window.location.href = './payment.html?orderNumber=' + res.orderNo
				}, function(errMsg){
					_mm.errorTips(errMsg)
				})
			}else{
				_mm.errorTips('请选择地址后提交')
			}
		});
		// 地址的添加
		$(document).on('click', '.address-add', function(){
			_addressModal.show({
				isUpdate : false,
				onSuccess: function(){
					_this.loadAddressList();
				}
			});
		});
		// 地址的编辑
		$(document).on('click', '.address-update', function(e){
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId, function(res){
				_addressModal.show({
					isUpdate : true,
					data: res,
					onSuccess: function(){
						_this.loadAddressList();
					}
				});
			}, function(errMsg){
				_mm.errorTips(errMsg);
			})	
		});
		// 地址的删除
		$(document).on('click', '.address-delete', function(e){
			e.stopPropagation();
			var id = $(this).parents('.address-item').data('id');
			if(window.confirm('确认要删除改地址？')){
				_address.deleteAddress(id, function(res){
					_this.loadAddressList();
				}, function(errMsg){
					_mm.errorTips(errMsg);
				})
			}	
		});
	},
	loadAddressList: function(){
		var _this = this;
		$('.address-con').html('<div class="loading"></div>');
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			var addressListHtml = _mm.renderHtml(templateAddress, res);
			$('.address-con').html(addressListHtml);
		}, function(errMsg){
			$('.address-con').html('<p class="err-tip">加载地址失败，清刷新重试</p>');
		})

	},
	addressFilter: function(data){
		if(this.data.selectedAddressId){
			var selectedAddressIdFlag = false;
			for (var i = 0, length = data.length; i <length; i++) {
				if(data.list[i].id === this.data.selectedAddressId){
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			};
			if(!selectedAddressIdFlag){
				this.data.selectedAddressId = null;
			}
		}
	},
	loadProductList: function(){
		var _this = this;
		$('.product-con').html('<div class="loading"></div>');
		_order.getProductList(function(res){
			var productListHtml = _mm.renderHtml(templateProduct, res);
			$('.product-con').html(productListHtml);
		}, function(errMsg){
			$('.product-con').html('<p class="err-tip">商品信息加载失败</p>');
		})

	}
};
$(function(){
	page.init();
});