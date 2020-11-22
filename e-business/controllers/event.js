const express = require("express")
const { check, validationResult} = require('express-validator'); 
const fs = require('fs')
const router = express.Router()


const adminModel = require.main.require("./models/adminModel")

//route root : /admin/event

router.post("*",[				  //POST : ("*")
    check('name','name must be atleast 5+ character long')
        .exists()
        .isLength({min:5}),
	
    check('description','description must be atleast 8+ character long')
        .exists()
        .isLength({ min: 8 })
	],(req, res,next)=>{

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            const alert = errors.array();
            res.render('admin/addEvent',{alert,loogedName: req.cookies['uname']})
		}else{
			next()
		}
	
	})

router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})

router.get("/",(req,res)=>{
    adminModel.pastEvent(result=>{
        const event = result;
        if (result) {
            res.render("admin/pastEvent",{eventInfo:event,loogedName: req.cookies['uname']})
        }
    })
 
})


router.get("/addEvent",(req,res)=>{
    res.render("admin/addEvent",{loogedName: req.cookies['uname']})
})

router.post("/addEvent",(req,res)=>{
    const event ={
        name:req.body.name,
        description:req.body.description
    }
    let data1 = JSON.stringify(event,null,2)
    console.log(data1);
   fs.writeFile('./models/admin/runningevent.json',data1,() => {})
   
    adminModel.addEvent(event,result=>{
        if (result) {
            res.redirect('/admin/event')
        }
  
    })
    
})



module.exports = router;