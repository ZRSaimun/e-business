const express = require("express")
const productModel = require.main.require("./models/productModel")
const userModel = require.main.require("./models/userModel")
const router = express.Router()



//route root : /admin/list

router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['uname'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})

router.get("/product",(req,res)=>{
    productModel.getProduct(results=>{ 
        const products = results;
          productModel.getAllCatagory(results=>{
            const catagorys = results;

            userModel.getSeller(results=>{
                const seller = results;

                userModel.getRetailseller(results=>{
                    const retailseller = results;
                    res.render("admin/productList",{productInfo:products,catagoryInfo:catagorys,sellerInfo:seller,retailsellerInfo:retailseller,pModel:productModel,loogedName: req.cookies['uname']})

                })
            })
        })
    
  
    })
    
    
})
router.get("/catagory",(req,res)=>{
    productModel.getAllCatagory(results=>{
        res.render("admin/catagoryList",{catagoryInfo:results,loogedName: req.cookies['uname']})
    })
    
})

router.get("/order",(req,res)=>{
    productModel.getOrder(results=>{
        const order = results;
        userModel.getCustomer(results=>{
            const customer = results;
            productModel.getProduct(results=>{
                const product = results;
                userModel.getSeller(results=>{
                    const seller = results;
                    userModel.getRetailseller(results=>{
                        const retailseller = results;
                        
                        res.render("admin/orderList",{orderInfo:order,customerInfo:customer,productInfo:product,sellerInfo:seller,retailsellerInfo:retailseller,loogedName: req.cookies['uname']})
                    })
                })
            })
        })
        
    })
    
})




module.exports = router;