module.exports = function(app){
    var express = require('express');
    var route = express.Router();
    var User = require('../models/user');

    route.get('/', function(req, res){
        if(req.session.user){
            req.session.destroy(function(){
                req.session;
            })
            res.send("<script>alert('로그아웃 성공!');location.href='/';</script>");
        }
        else{
            res.send("<script>alert('에러: 로그인 상태가 아닌데요...?');location.href='/';</script>");
            res.render('index', {
                title: "이어살기 찾아요 - 메인",
                isLogin: false
            })
        }
    });
    return route;
};