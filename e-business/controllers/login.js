var express = require('express');
var userModel = require.main.require('./model/user-model');
var retailsellerModel = require.main.require('./model/retailsellerModel');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('login/index');
});

router.post('/', (req, res) => {

    var user = {
        userId: req.body.uname,
        password: req.body.password
    };
    retailsellerModel.validate(user, function(result) {
        if (result.length > 0) {
            req.session.uId = req.body.uname;
            /*if (result[0].U_TYPE == "ADMIN" && result[0].U_STATUS == "VALID") {
                res.redirect('/admin');

            } else if (result[0].U_TYPE == "MEMBER" && result[0].U_STATUS == "VALID") {
                res.redirect('/member');
            } else*/
            if (result[0].type == "RETAILSELLER") {
                res.redirect('/retailseller');
            } else {
                res.render("login/index");

            }
        } else {
            res.render("login/index");
        }
    });
});

module.exports = router;