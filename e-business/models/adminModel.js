
const db = require("./db");

module.exports = {
	validate : function(admin,callback){
        var sql = "select * from adminpi where email='"+admin.username+"' and password='"+admin.password+"'";
			  
		  db.getResults(sql, results=>{
				if (results.length >0) {
					callback(results)
				}else{
					callback(false)
				}
		  })

		},
    getAdmin : function(callback){
        var sql = "select * from adminpi";
			  
		  db.getResults(sql, results=>{
				if (results.length >0) {
					callback(results)
				}else{
					callback(false)
				}
		  })

		},
		updateAdmin: function(user,id,callback){
			var sql = "update adminpi set name = '"+user.name+"',email = '"+user.email+"',password = '"+user.password+"',profile_pic = '"+user.pp.name+"',phone_no = '"+user.contact+"' where admin_id = '"+id+"'";
			db.execute(sql, status=>{
				callback(status)
		  })
	
		},
		pastEvent:function(callback){
			var sql = "select * from event";
				  
			  db.getResults(sql, results=>{
					if (results.length >0) {
						callback(results)
					}else{
						callback(false)
					}
			  })
	
			},
			addEvent:function(event,callback){
				var sql = "insert into event values('','"+event.name+"', '"+event.description+"')";
						  
					db.execute(sql, status=>{
						callback(status)
				  })
			
				}
		
		

   

 }

    

    
