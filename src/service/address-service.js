/*
* @Author: huziangWEB
* @Date:   2019-02-22 01:44:48
* @Last Modified by:   huziangWEB
* @Last Modified time: 2019-02-22 13:47:39
*/


'use strict';

var _mm = require('util/mm.js');

var _address = {
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data : {
            	pageSize : 50,
            },
            success : resolve,
            error   : reject
        });
    },
    // 新建地址
    save : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取单条地址信息
    getAddress : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    update : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    deleteAddress : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data : {
                shippingId:shippingId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _address;