module.exports = function(app){
    var express = require('express');
    var router = express.Router();
    var User = require('../models/user');

    router.route('/')
        .get(function(req, res){
            if(req.session.user){
                res.send("<script>alert('로그인 상태 입니다');location.href='/';</script>");
            }
            else{
                res.render('login', {
                    title: "이어살기 찾아요 - 로그인"
                })
            }
        })
        .post(function(req, res){
            console.log("we have a login request for: " + req.body.ID + " and passwd of: " + req.body.PW);
            User.findOne({userID : req.body.ID, password : req.body.PW}, function(err, result){
                console.log("searching exisiting users");
                if(err || result != null){
                    if(err) console.log("we have error at findOne function");
                    else console.log("we found user with %s %s", result.userID, result.password);
                    req.session.user = {
                        id: req.body.ID,
                        pw: req.body.PW,
                        authorized: true
                    };
                    res.render('index', {
                        title: "이어살기 찾아요 - 메인",
                        isLogin: true
                    })
                }
                if(!result){
                    console.log("no existing user - please sign up");
                    res.send("<script>alert('유저 정보가 없습니다. 회원가입 해주세요');location.href='sign_up';</script>");
                }
            })
        })
        ;
    return router;
};