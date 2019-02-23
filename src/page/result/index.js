/*
* @Author: huziangWEB
* @Date:   2019-01-23 13:28:11
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-23 00:20:38
*/
'use strict'
require('./index.css');
require('page/commons/nav-simple/index.js');
var _mm = require('util/mm.js');


$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	if(type === 'payment'){
		var orderNumber = _mm.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number');
		$orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
	}
	$element.show();
	
})