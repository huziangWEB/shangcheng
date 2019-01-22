/*
* @Author: huziangWEB
* @Date:   2019-01-22 19:21:30
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-01-22 22:15:03
*/
'use strict';
require('./index.css');
var _mm     = require('util/mm.js');
var templateIndex = require('./index.string');

// 侧边导航
var navSide = {
	option : {
		name: '',
		navList: [
			{name: 'user-center', desc: '个人中心', href: './user-center.html'},
			{name: 'order-list', desc: '我的订单', href: './order-list.html'},
			{name: 'pass-update', desc: '修改密码', href: './pass-update.html'},
			{name: 'about', desc: '关于MMall', href: './about.html'}
		]
	},
    init : function(option){
    	$.extend(this.option, option);
    	this.renderNav();
    },
    renderNav : function(){
    	for(var i = 0, iLength = this.option.navList.length; i < iLength; i ++){
    		if(this.option.navList[i].name === this.option.name){
    			this.option.navList[i].isActive = true;
    		};
    	};
    	var navHtml = _mm.renderHtml(templateIndex, {
    		navList : this.option.navList
    	});
    	$('.nav-side').html(navHtml);
    }
};

module.exports = navSide;