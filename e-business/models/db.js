const mysql = require("mysql");



    
var getConnection = (callback=>{
    var connection = mysql.createConnection({
        host     :'127.0.0.1',
        database :'ebazar',
        user     :'root',
        password : ''
        });
        
        connection.connect(function(err) {
            if (err) {
              console.error('error connecting: ' + err.stack);
              return;
            }
           
            console.log('connected as id ' + connection.threadId);
          });

          callback(connection);
    
})

module.exports = {
    getResults:(sql,callback)=>{
        getConnection(connection=>{
            connection.query(sql,(error,results)=>{
                callback(results);
            })
            connection.end((err)=>{
                console.log("connection ended");
            })
        })
    },

    execute:(sql,callback)=>{
        getConnection(connection=>{
            connection.query(sql,(error,status)=>{
                if (status) {
                    callback(true)
                }else{
                    callback(false)
                }
            })
            connection.end((err)=>{
                console.log("connection ended");
            })
        })
    }
}