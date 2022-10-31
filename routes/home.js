// routes/home.js

module.exports = function(app){
    var express = require('express');
    var route = express.Router();
    var Post = require('../models/post');
    
    route.get('/',function(req, res){
        Post.find({})
                .sort('-createdAt')
                .exec(function(err, posts){
                    if(err) console.log(err);
                    //res.render('posts/index', {posts:posts});
                    if(req.session.user){
                        res.render('index', {
                            title: "main_page",
                            isLogin: true,
                            currentUser: req.session.user.id,
                            posts:posts
                        })    
                    }else{
                        res.render('index', {
                            title: "main_page",
                            isLogin: false,
                            posts:posts
                        })
                    }
                });
    });

    return route;
};