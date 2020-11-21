var express = require('express');
var bodyParser = require('body-parser');
var exSession = require('express-session');
var path = require('path');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var signup = require('./controllers/signup');
var login = require('./controllers/login');
var admin = require('./controllers/admin');
var member = require('./controllers/member');
var restaurantModel = require.main.require('./model/restaurantModel');
var retailseller = require('./controllers/retailseller');

var app = express();
var port = 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
/*---------------------------------------*/
app.use(exSession({ secret: 'secret', saveUninitialized: true, resave: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var storage = multer.diskStorage({
    destination: "./images/",
    filename: function(req, file, cb) {
        cb(null, "image_" + Date.now() + path.extname(file.originalname));
    }
});
app.use(multer({
    storage: storage
}).single('imageFile'));
app.use('/signup', signup);
app.use('/login', login);
app.use('/admin', admin);
app.use('/member', member);
app.use('/retailseller', retailseller);


app.use('/', express.static('asset'));
/*app.use('/pictures', express.static('images'));*/


//router
/**---------------------------------------------- */


app.get('/setCookie', (req, res) => {
    res.cookie('cookie1', 'first cookie');
    res.send("done");
});

app.get('/viewCookie', (req, res) => {
    res.send(req.cookies['cookie1']);
});

app.get('/rmCookie', (req, res) => {
    res.clearCookie('cookie1');
    res.send('Done');
});


//server stratup
app.listen(port, (error) => {
    console.log('server started at ' + port);
});