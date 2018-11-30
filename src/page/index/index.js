/*
* @Author: Administrator
* @Date:   2018-11-13 20:34:50
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-29 15:14:55
*/
const _mm = require('util/mm.js');




console.log('hello index')
alert(123)

_mm.request({
	url: './text.do',
	success: function(res){
		console.log(res);
	},
	error: function(res){
		console.log(res);
	}
});