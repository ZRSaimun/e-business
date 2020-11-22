
const express = require("express")
const { body, validationResult} = require('express-validator'); 
const adminModel = require("../models/adminModel");
const router 	= express.Router();

router.post("*",[				  //POST : ("*")
	body('email').isEmail(),
	
	body('pass').isLength({ min: 5 })
	],(req, res,next)=>{

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}else{
			next()
		}
	
	})


router.get('/', (req, res)=>{ //GET:/login
	res.render('admin/adminLogin',{layout:'./layouts/registration'});
});

router.post("/",(req,res)=>{ //POST:/login
    const admin ={
        username : req.body.email,
        password : req.body.pass
    }

    adminModel.validate(admin,results=>{

        if (results) {
                res.cookie('uname', req.body.email)
                res.cookie('aid', results[0].admin_id)
                res.redirect("/admin")
        }else{
            res.redirect("/login") 
        }
        
    })
})


module.exports = router;