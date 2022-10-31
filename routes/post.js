// routes/posts.js

module.exports = function(app){
    var express  = require('express');
    var router = express.Router();
    var Post = require('../models/post');

    router.route('/:id')
        .get(function(req, res){
            console.log(req.session.user);
            Post.findOne({_id:req.params.id}, function(err, post){
                if(err) console.log(err);

                if(req.session.user){
                    res.render('index', {
                        title: 'post_show',
                        post:post,
                        currentUser:req.session.user.id,
                    });
                }
                else{
                    res.render('index', {
                        title: 'post_show',
                        post:post,
                        currentUser:null,
                    });
                }
            })
        })
        .delete(function(req, res){
            console.log("called delete method");
            Post.deleteOne({_id:req.params.id}, function(err, post){
                if(err) console.log(err);
                res.redirect('/');
            });
        })
    ;

    router.route('/:id/edit')
        .get(function(req, res){
            Post.findOne({_id:req.params.id}, function(err, post){
                if(err) console.log(err);
                res.render('index',{
                    title:'post_edit',
                    post:post,
                    currentUser:req.session.user.id
                });
            })
        })
        .put(function(req, res){
            console.log("called put method");
            req.body.updatedAt = Date.now();
            Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
                if(err) console.log(err);
                res.redirect('/post/' + req.params.id);
            })
        });
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