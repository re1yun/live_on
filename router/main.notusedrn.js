module.exports = function(app)
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
    app.post('/login', function(req, res){
        var user = new User(req.body);
        //user.userID = req.body.ID;
        //user.password = req.body.PW;
        console.log("we have a login request for: " + user.userID + " and passwd of: " + user.password);

        User.findOne({userID : user.userID, password : user.password}, function(err, result){
            console.log("searching exisiting users");
            if(err || result != null){
                if(err) console.log("we have error at findOne function");
                else console.log("we found user with %s %s", result.userID, result.password);
                res.send("<script>alert('로그인 성공!');location.href='/';</script>");
            }
            if(!result){
                console.log("no existing user - please sign up");
                res.send("<script>alert('유저 정보가 없습니다. 회원가입 해주세요');location.href='sign_up';</script>");
            }
        })
    });
    app.post('/sign_up', function(req, res){
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