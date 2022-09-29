module.exports = function(app){
    var express = require('express');
    var router = express.Router();
    var User = require('../models/user');

    router.route('/')
        .get(function(req, res){
            if(req.session.user){
                res.send("<script>alert('로그인된 상태임');location.href='/';</script>");
            }
            else{
                res.render('sign_up', {
                    title: "이어살기 찾아요 - 회원가입"
                })
            }
        })
        .post(function(req, res){
            var user = new User();
            user.userID = req.body.ID;
            user.password = req.body.PW;
            console.log("we have a new request for: " + user.userID + " and passwd of: " + user.password);

            User.findOne({userID : user.userID}, function(err, result){
                console.log("searching exisiting users");
                if(err || result != null){
                    if(err) {
                        console.log("we have error at findOne function");
                    }
                    else {
                        console.log("we already have %s %s", result.userID, result.password);
                    }
                    res.send("<script>alert('이미 존재하는 유저입니다');location.href='sign_up';</script>");
                }
                if(!result){
                    console.log("no existing user - proceed to save function");
                    user.save(function(err){
                        if(err){
                            console.log("we have error at save function");    
                        }
                        res.send("<script>alert('회원가입 성공!');location.href='login';</script>");
                    });
                }
            })
        })
        ;
    return router;
};