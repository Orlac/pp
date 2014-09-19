/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var request = require('request');
var cheerio = require('cheerio');
//var sleep = require('sleep');


var host='http://freelansim.ru/tasks?page=';
var pageDeep=100;
var startPage=1;

function doSomething() {
    _start(startPage);
}

function _start(page){
    var _url=host+page;
    
    _load(_url, function(err, body){
        
        _parse(body, function(err, data){
            
            _save(data, page, function(err){
                //var _sleep=Math.random()*10;
//                var _sleep=5;
//                console.log('----------sleep '+_sleep+' sec...--------------------');
                page++;
                if(page <= pageDeep){
                    _start(page);
                }else{
                    console.log('done');
                }
                
//                setTimeout(function() {
//                    _start(page);
//                }, _sleep );
                
                
            });
        });
    });
}

function _load(url, callBack){
    request({
        uri: url,
        method: 'GET',
        encoding: 'binary',
        headers: {
            //"Accept-Encoding":"gzip,deflate,sdch",
            "Accept-Language":"ru,en;q=0.8",
            "Connection":"keep-alive",
            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            //'Host':'freelansim.ru',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 YaBrowser/14.7.1916.15705 Safari/537.36'
        }
    }, function (err, res, body) {
        
        //console.log('res', res);
        
        if(err) return callBack(err);
        console.time(url);
        callBack(null, body);
        console.timeEnd(url);

    });
}

function _parse(body, callBack){
    var $ = cheerio.load(body);
    
    var data = [];
    $('.task__title a').each(function(){
        data.push({
            url: $(this).attr('href'),
            title: $(this).text()
        });
    });
    
    callBack(null, data);
}

function _save(data, page, callBack){
    console.log('----------page'+page+'--------------------');
    console.log(data);
    
    setTimeout(function() {
        callBack(null);
    }, 0 );
}
// Functions which will be available to external callers
exports.start = doSomething;
