/*
* @Author: huziangWEB
* @Date:   2019-02-22 23:32:27
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-23 00:08:24
*/
'use strict';

var _mm = require('util/mm.js');

var _payment = {
    getPaymentInfo : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data: {
            	orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    getPaymentStatus : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;