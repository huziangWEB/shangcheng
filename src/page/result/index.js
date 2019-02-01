/*
* @Author: huziangWEB
* @Date:   2019-01-23 13:28:11
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-01-23 15:12:03
*/
'use strict'
require('./index.css');
require('page/commons/nav-simple/index.js');
var _mm = require('util/mm.js');


$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	$element.show();
	
})