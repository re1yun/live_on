module.exports = function(app, fs, User)
{
    app.get('/',function(req,res){
    res.render('index', {
        title: "이어살기 찾아요 - 메인"
    })
    });

    app.get('/login', function(req, res){
        res.render('login', {
            title: "이어살기 찾아요 - 로그인"
        })
    });
    app.get('/sign_up', function(req, res){
        res.render('sign_up', {
            title: "이어살기 찾아요 - 회원가입"
        })
    });
    app.post('/sign_up', function(req, res){
        var user = new User();
        user.userID = req.body.ID;
        user.password = req.body.PW;
        console.log("we have a new request for: " + user.userID + " and passwd of: " + user.password);

        User.findOne({'userID' : 'user.userID'}, function(err, result){
            console.log("searching exisiting users");
            if(err || result != null){
                if(err) console.log("we have error at findOne function");
                else console.log("we already have %s %s", result.userID, result.password);
                //res.write("<script charset='euc-kr'>alert('it already exists')</script>");
                res.redirect('/sign_up');
            }
            if(!result){
                console.log("no existing user - proceed to save function");
                user.save(function(err){
                    if(err){
                        console.log("we have error at save function");    
                        return res.write("<script charset='utf-8'>alert('failed to save new user')</script>");
                    }
                    res.redirect('/login');
                    //return res.write("<script charset='utf-8'>alert('successfully saved new user')</script>");
                });
            }
        })

    });
}


// app.get("/", function(request, response){
//     var url = request.url;
//     if(request.url == '/'){
//       url = '/index.html';
//     }
//     if(request.url == '/favicon.ico'){
//         response.writeHead(404);
//         response.end();
//         return;
//     }
//     response.send(fs.readFileSync(__dirname + url));
//   });