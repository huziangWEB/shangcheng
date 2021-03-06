/*
* @Author: huziangWEB
* @Date:   2019-01-20 16:50:17
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-14 20:32:11
*/
'use strict';

require('./index.css');
var _mm     = require('util/mm.js');

// 通用页面头部
var header = {
    init : function(){
        this.bindEvent();
        this.onLoad();
    },
    onLoad : function(){
    	var keyword = _mm.getUrlParam('keyword');
    	if(keyword){
    		$('#search-input').val(keyword)
    	};
    },
    bindEvent : function(){
    	var _this = this;
    	$('#search-btn').click(function(){
    		_this.searchSubmit();
    	});
    	//输入回车后，做搜索提交
    	$('#search-input').keyup(function(e){
    		if(e.keyCode ===13){
    			_this.searchSubmit();
    		}
    	});
    },
    // 搜索的提交
    searchSubmit : function(){
    	var keyword = $.trim($('#search-input').val());
    	if(keyword){
    		window.location.href = './list.html?keyword=' + keyword;
    	}else{
    		_mm.goHome();
    	}
    }

};

header.init();
