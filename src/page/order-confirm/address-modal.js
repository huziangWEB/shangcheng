/*
* @Author: huziangWEB
* @Date:   2019-02-22 02:38:58
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-22 13:40:56
*/
'use strict'
var _mm = require('util/mm.js');
var _cities = require('util/cities/index.js');
var _address = require('service/address-service.js');
var templateAddressModal = require('./address-modal.string');

var addressModal = {
	show: function(option){
		// option的绑定
		this.option = option;
		this.option.data = option.data || {};
		this.$modalWrap = $('.modal-wrap');
		//渲染页面
		this.loadModal();
		// 绑定事件
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		this.$modalWrap.find('#receiver-province').change(function(){
			var selectedProvince = $(this).val();
			_this.loadCities(selectedProvince);
		});

		this.$modalWrap.find('.address-btn').click(function(){
			var receiverInfo = _this.getReceiverInfo(),
				isUpdate = _this.option.isUpdate;
			if(!isUpdate && receiverInfo.status){
				_address.save(receiverInfo.data, function(res){
					_mm.successTips('地址添加成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function'
					&& _this.option.onSuccess(res);
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else if(isUpdate && receiverInfo.status){
				_address.update(receiverInfo.data, function(res){
					_mm.successTips('地址更新成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function'
					&& _this.option.onSuccess(res);
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips(receiverInfo.errMsg || '哪里不对了吧~');
			}
		});

		this.$modalWrap.find('.close').click(function(){
			_this.hide();
		});
		this.$modalWrap.find('.modal-container').click(function(e){
			e.stopPropagation();
		});
	},
	// 获取表单里收件人信息的方法，并做表单验证
	getReceiverInfo: function(){
		var receiverInfo = {},
			result = {
				status : false
			};
		receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
		receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
		receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
		receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
		receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
		receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
		if(this.option.isUpdate){
			receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
		}

		if(!receiverInfo.receiverName){
			result.errMsg = '请输入收件人姓名';
		}else if(!receiverInfo.receiverProvince){
			result.errMsg = '请选择收件人所在省份';
		}else if(!receiverInfo.receiverCity){
			result.errMsg = '请选择收件人所在城市';
		}else if(!receiverInfo.receiverPhone){
			result.errMsg = '请选择收件人手机号';
		}else if(!receiverInfo.receiverAddress){
			result.errMsg = '请选择收件人详细地址';
		}else{
			result.status = true;
			result.data = receiverInfo;
		}
		return result;
	},
	loadModal: function(){
		var addressModalHtml = _mm.renderHtml(templateAddressModal, {
			isUpdate : this.option.isUpdate,
			data : this.option.data
		});
		this.$modalWrap.html(addressModalHtml);
		// 加载省份
		this.loadProvince();
		
	},
	loadProvince: function(){
		var provinces = _cities.getProvinces() || [],
			$provinceSelect = this.$modalWrap.find('#receiver-province');
		$provinceSelect.html(this.getSelectOption(provinces));
		if(this.option.isUpdate && this.option.data.receiverProvince){
			$provinceSelect.val(this.option.data.receiverProvince);
			// 加载城市
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	loadCities: function(provinceName){
		var cities = _cities.getCities(provinceName) || [],
			$citySelect = this.$modalWrap.find('#receiver-city');
		$citySelect.html(this.getSelectOption(cities));
		if(this.option.isUpdate && this.option.data.receiverCity){
			$citySelect.val(this.option.data.receiverCity);
		}

	},
	// 获取select框的选项，输入：array，输出：html
	getSelectOption: function(optionArray){
		var html = '<option value="">请选择</option>'
		for(var i = 0, length = optionArray.length; i< length; i++){
			html += '<option value="'+ optionArray[i] +'">'+ optionArray[i] +'</option>'
		}
		return html;
	},
	hide: function(){
		this.$modalWrap.empty();
	}
};
module.exports = addressModal;