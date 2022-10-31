// routes/posts.js

module.exports = function(app){
    var express  = require('express');
    var router = express.Router();
    var Post = require('../models/post');

    router.route('/')
        .get(function(req, res){
            if(req.session.user){
                console.log(req.session.user);
                res.render('index', {
                    title: 'post_write',
                    currentUser: req.session.user.id
                });
            }
            else{
                res.send("<script>alert('로그인 후 사용할 수 있습니다');location.href='/';</script>");
            }
        })
        .post(function(req, res){
            Post.create(req.body, function(err, post){
                if(err) return res.json(err);
                res.redirect('/');
            });
        })
        ;
    return router;
}


// // New
// router.get('/new', function(req, res){
//   res.render('posts/new');
// });

// // show
// router.get('/:id', function(req, res){
//   Post.findOne({_id:req.params.id}, function(err, post){
//     if(err) return res.json(err);
//     res.render('posts/show', {post:post});
//   });
// });

// // edit
// router.get('/:id/edit', function(req, res){
//   Post.findOne({_id:req.params.id}, function(err, post){
//     if(err) return res.json(err);
//     res.render('posts/edit', {post:post});
//   });
// });

// // update
// router.put('/:id', function(req, res){
//   req.body.updatedAt = Date.now(); //2
//   Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
//     if(err) return res.json(err);
//     res.redirect("/posts/"+req.params.id);
//   });
// });

// // destroy
// router.delete('/:id', function(req, res){
//   Post.deleteOne({_id:req.params.id}, function(err){
//     if(err) return res.json(err);
//     res.redirect('/posts');
//   });
// });

// module.exports = router;