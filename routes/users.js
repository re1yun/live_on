// routes/users.js

module.exports = function(app){
    var express = require('express');
    var router = express.Router();
    var User = require('../models/user');

    router.route('/')
        .get(function(req, res){
            res.render('index', {
                title: 'user_show',
                user:req.session.user
            })
        })
    ;

    router.route('/:username')
        .get(function(req, res){
            User.findOne({userID:req.params.username}, function(err, user){
                if(err) return console.log(err);
                res.render('index', {
                    title: 'user_show',
                    user:user
                })
            });
        })

        .put(function(req, res){
            User.findOne({userID:req.params.username})
              .select('password')
              .exec(function(err, user){
                if(err) return console.log(err);
            
                // update user object
                user.originalPassword = user.password;
                user.password = req.body.newPassword? req.body.newPassword : user.password;
                for(var p in req.body){
                  user[p] = req.body[p];
                }
            
                // save updated user
                user.save(function(err, user){
                  if(err) return res.json(err);
                  res.redirect('/user/'+user.userID);
                });
            });
        })

        .delete(function(req, res){
            User.deleteOne({userID:req.params.username}, function(err){
              if(err) return res.json(err);
              res.redirect('/');
            });
        })
    ;

    router.route('/:username/edit')
        .get(function(req, res){
            User.findOne({userID:req.params.username}, function(err, user){
              if(err) return res.json(err);
              res.render('users/edit', {user:user});
            });
        })
    ;
    return router;
};