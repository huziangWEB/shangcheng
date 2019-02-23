/*
* @Author: huziangWEB
* @Date:   2019-02-22 02:51:54
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-22 03:09:23
*/
'use strict'

var _cities ={
	cityInfo: {
		'北京':['北京'],
		'上海':['上海'],
		'天津':['天津'],
		'重庆':['重庆'],
		'河北省':['石家庄','张家口','承德','秦皇岛']
	},
	// 获取所有的省份
	getProvinces: function(){
		var provinces = [];
		for(var item in this.cityInfo){
			provinces.push(item);
		}
		return provinces;
	},
	// 获取某省份的所有城市
	getCities: function(provinceName){
		return this.cityInfo[provinceName] || [];
	}
};
module.exports = _cities;