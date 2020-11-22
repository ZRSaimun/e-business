
const db = require("./db");

module.exports = {
    validate : function(user,callback){
        var sql = "select * from user where email='"+user.username+"' and password='"+user.password+"'";
			  
		  db.getResults(sql, results=>{
				if (results.length >0) {
					callback(results)
				}else{
					callback(false)
				}
		  })

		},
		updateAdmin: function(user,uid,callback){
			var sql = "update user set email='"+user.email+"',password ='"+user.password+"' where user_id='"+uid+"'";
			db.execute(sql, status=>{
				callback(status)
		  })
	
		},
		getCustomer : function(callback){
			var sql = "select * from customerpi";
			console.log(sql);
			   
			  db.getResults(sql, results=>{
					if (results.length >0) {
						callback(results)
					}else{
						callback(false)
					}
			  })
			},
		getCustomerByID:function(cid,callback){
			var sql = "select * from customerpi where customer_id='"+cid+"'";
			console.log(sql);
			   
			  db.getResults(sql, results=>{
					if (results.length >0) {
						callback(results)
					}else{
						callback(false)
					}
			  })
			},
		banCustomer:function(cid,callback){
			var sql = "update customerpi set block_status='"+1+"' where customer_id='"+cid+"'";
			console.log(sql);
		
			  db.execute(sql, results=>{
					
						callback(results)
					
			  })
			},
		unbanCustomer:function(cid,callback){
			var sql = "update customerpi set block_status='"+0+"' where customer_id='"+cid+"'";
			console.log(sql);
		
			  db.execute(sql, results=>{
					
						callback(results)
					
			  })
			},
		getSeller :function(callback){
			var sql = "select * from sellerpi";
			console.log(sql);
			   
			  db.getResults(sql, results=>{
					if (results.length >0) {
						callback(results)
					}else{
						callback(false)
					}
			  })
			},
		getRetailseller :function(callback){
			var sql = "select * from retailsellerpi";
			console.log(sql);
				   
				 db.getResults(sql, results=>{
					if (results.length >0) {
						callback(results)
					}else{
						callback(false)
					}
				})
			},
		verifySeller:function(sid,callback){
			var sql = "update sellerpi set verified='"+1+"' where user_id='"+sid+"'";
			console.log(sql);
		
			  db.execute(sql, results=>{
					
						callback(results)
					
			  })
			},
			createUser : function(retailseller,callback){
			var sql = "insert into user values('','"+retailseller.email+"', '"+retailseller.pass+"', '"+retailseller.type+"')";
					  
				db.execute(sql, status=>{
					callback(status)
			  })
		
			},

			createRetailseller : function(uid,retailseller,callback){
				var sql = "insert into retailsellerpi values('','"+uid+"','"+retailseller.name+"', '"+retailseller.email+"','"+0+"','"+0+"','"+0+"','"+0+"','"+0+"','"+0+"')";
						  
					db.execute(sql, status=>{
						callback(status)
				  })
			
				},

				getUserBy:function(retailseller,callback){
					var sql = "select * from user where email='"+retailseller.email+"' and password='"+retailseller.pass+"'";
					console.log(sql);
					   
					  db.getResults(sql, results=>{
							if (results.length >0) {
								callback(results)
							}else{
								callback(false)
							}
					  })
					},
			getReport:function(callback){
				var sql = "select * from report";
				console.log(sql);
					   
					 db.getResults(sql, results=>{
						if (results.length >0) {
							callback(results)
						}else{
							callback(false)
						}
					})
				},
			dltReport:function(id,callback){
				var sql = "DELETE FROM report WHERE report_id = '"+id+"'";
					  
						db.execute(sql, status=>{
							callback(status)
					})
		
				},
			dltUser:function(uid,callback){
				var sql = "DELETE FROM user WHERE user_id ='"+uid+"'";
				console.log(sql);
						  
						db.execute(sql, status=>{
							callback(status)
					})
			
				},
			dltretailseller:function(uid,callback){
				var sql = "DELETE FROM retailsellerpi WHERE user_id ='"+uid+"'";
						  
						db.execute(sql, status=>{
							callback(status)
					})
			
				},
				dltseller:function(uid,callback){
					var sql = "DELETE FROM sellerpi WHERE user_id ='"+uid+"'";
							  
							db.execute(sql, status=>{
								callback(status)
						})
				
					},
			blockseller:function(uid,callback){
				var sql = "update sellerpi set block_status='"+1+"' where user_id='"+uid+"'";
				console.log(sql);
			
				  db.execute(sql, results=>{
						
							callback(results)
						
				  })
				},
				unblockseller:function(uid,callback){
					var sql = "update sellerpi set block_status='"+0+"' where user_id='"+uid+"'";
					console.log(sql);
				
					  db.execute(sql, results=>{
							
								callback(results)
							
					  })
					},
			createSeller:function(uid,user,callback){
				var sql = "insert into sellerpi values('','"+uid+"','"+user.name+"', '"+user.email+"','"+0+"','"+0+"','"+0+"','"+0+"','"+0+"','"+0+"','"+0+"','"+0+"','"+1+"')";
						  
					db.execute(sql, status=>{
						callback(status)
				  })
			
				},
			getUser: function(callback){
				var sql = "select * from user";
				console.log(sql);
					   
					 db.getResults(sql, results=>{
						if (results.length >0) {
							callback(results)
						}else{
							callback(false)
						}
					})
				}

 }

    

    
