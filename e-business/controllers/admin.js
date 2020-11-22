const express = require("express")
const { check, validationResult} = require('express-validator'); 
const fileUpload = require('express-fileupload')
const fs = require('fs')
const router = express.Router()
const event = require.main.require("./controllers/event")
const seller = require.main.require("./controllers/seller")
const retailManager = require.main.require("./controllers/retailManager")
const list = require.main.require("./controllers/list")

//models
const adminModel = require.main.require("./models/adminModel")
const userModel = require.main.require("./models/userModel")



//controllers
router.use("/event",event)
router.use("/seller",seller)
router.use("/retailManager",retailManager)
router.use("/list",list)
// default options
router.use(fileUpload());


//route root : /admin

router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})


router.get("/",(req,res)=>{
    const data = fs.readFileSync('./models/admin/runningevent.json')
    const jsonEventData= JSON.parse(data);
    
    userModel.getUser(result=>{
        const user =result;
        res.render("admin/index",{userInfo:user,runningEvent:jsonEventData,loogedName: req.cookies['uname']})
    })
    
})

// router.get("/registration", (req,res)=>{
//     res.render('admin/register',{layout:'./layouts/registration'})
// })
router.get("/registrationRetailer", (req,res)=>{
    res.render('admin/register',{layout:'./layouts/registration'})
})

router.post("/registrationRetailer",[				  //POST : 
    check('name','name must be atleast 5+ character long')
        .exists()
        .isLength({min:5}),
	
    check('email','Must be a vaid Email')
        .exists()
        .isEmail(),
    check('password','password must be atleast 5+ character long')
        .exists()
        .isLength({min:5}),
    check('password','password must be atleast 5+ character long')
        .exists()
        .isLength({min:5})
        
	],(req, res,next)=>{

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            const alert = errors.array();
            res.render('admin/register',{alert,layout:'./layouts/registration'})
		}else{
			next()
		}
	
	})

router.post("/registrationRetailer", (req,res)=>{
    const retailseller = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.password,
        cpass: req.body.cpassword,
        type: "retailSeller"
    }
    userModel.createUser(retailseller,status=>{
        userModel.getUserBy(retailseller,result=>{
            const uid = result[0].user_id;
            console.log(uid);
            userModel.createRetailseller(uid,retailseller,status=>{
                res.redirect('/admin')
            })
        })
        
    })

})

router.get("/profile", (req,res)=>{  //GET : /admin/profile
    adminModel.getAdmin(result=>{
        res.render('admin/profile',{adminInfo:result[0],loogedName: req.cookies['uname']})
    })
   
})

router.post("/profile", (req,res)=>{  //POST : /admin/profile
    const aid = req.cookies['aid'];
    const id = 1
    const user = {
        name:req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        pp:req.files.profilePic

    }
    //file upload test
    console.log(user.pp);
  
    let sampleFile = user.pp;
    const p = req.cookies['up'];
    sampleFile.mv(p+'/sampleFile.jpg', function(err) {
        if (err)
        return res.status(500).send(err);
      });


    res.cookie('uname', user.email)
            adminModel.updateAdmin(user,id,status=>{
                if (status) {
                    res.redirect('/admin')
                }//else needed some work
            })
})

router.get("/customer/:id", (req,res)=>{
    const cid = req.params.id;
    userModel.getCustomerByID(cid,result=>{
        console.log(result);
        res.render('admin/customerBan',{customer:result[0],loogedName: req.cookies['uname']})
    })
    
})

router.post("/customer/:id", (req,res)=>{
    const cid = req.params.id;
    userModel.banCustomer(cid,result=>{
        console.log(result);
        res.redirect("/admin/customer")
    })
    
})
router.get("/customer/unban/:id", (req,res)=>{
    const cid = req.params.id;
    userModel.unbanCustomer(cid,result=>{
        console.log(result);
        res.redirect("/admin/customer")
    })
    
})
router.get("/customer", (req,res)=>{
    userModel.getCustomer(result=>{
        console.log(result);
        res.render('admin/customer',{customerInfo:result,loogedName: req.cookies['uname']})
    })
})

router.get("/verifySeller", (req,res)=>{
    userModel.getSeller(result=>{
        const seller = result;
        res.render('admin/verifySeller',{sellerInfo:seller,loogedName: req.cookies['uname']})
    })
    
})

router.get("/verifySeller/:id", (req,res)=>{
    const sid = req.params.id;
    userModel.verifySeller(sid,result=>{
        res.redirect('/admin/verifySeller')
    })
    
})
router.get("/report", (req,res)=>{
    userModel.getReport(result=>{
        const report = result;
        userModel.getCustomer(result=>{
            const customer = result;
            userModel.getSeller(result=>{
                const seller = result;
                userModel.getRetailseller(result=>{
                    const retailseller = result;
                    res.render('admin/report',{reportInfo:report,customerInfo:customer,sellerInfo:seller,retailsellerInfo:retailseller,loogedName: req.cookies['uname']})
                })
            })
        })
    })
    
})

router.get("/report/delete/:id",(req,res)=>{
    const id = req.params.id;
    userModel.dltReport(id,status=>{
        if (status) {
            res.redirect("/admin")
        }
        
    })
})


module.exports = router;