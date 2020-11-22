const express           = require("express");
const cookieParser 		= require('cookie-parser');
const expressLayouts = require('express-ejs-layouts')
const bodyParser        = require("body-parser");

//controllers

const admin = require("./controllers/admin")
const login = require("./controllers/login")
const logout = require("./controllers/logout")


const app = express();
const port = 3000;

//config
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/dashboard');

//middleware
app.use('/public', express.static('public'));



app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//route
app.use("/admin",admin);
app.use("/login",login);
app.use("/logout",logout);



app.get("/",(req,res)=>{
    res.cookie('up', __dirname+'/public/admin/uploads')
    res.send("HOME");
})



app.listen(port,(err)=>{
    if (!err) {
        console.log("server started at "+port);
    }
})