var db = require('./db');

module.exports = {
    get: function(retailsellerID, callback) {
        var sql = "select * from retailsellerpi where user_id = ?";
        db.getResult(sql, [retailsellerID], function(result) {
            callback(result);
        });
    },
    get2: function(retailsellerID, callback) {
        var sql = "select * from retailsellerpi where retailseller_id = ?";
        db.getResult(sql, [retailsellerID], function(result) {
            callback(result);
        });
    },
    get3: function(retailsellerID, callback) {
        var sql = "select * from customerpi where 	customer_id = ?";
        db.getResult(sql, [retailsellerID], function(result) {
            callback(result);
        });
    },
    getUser: function(user_id, callback) {
        var sql = "select * from retailsellerpi where user_id = ?";
        db.getResult(sql, [user_id], function(result) {
            callback(result);
        });
    },
    getUser2: function(uu, callback) {
        var sql = "select * from retailsellerpi where retailseller_id = ?";
        db.getResult(sql, [uu], function(result) {
            callback(result);
        });
    },
    getUser3: function(cc, callback) {
        var sql = "select * from customerpi where customer_id = ?";
        db.getResult(sql, [cc], function(result) {
            callback(result);
        });
    },
    getAll: function(callback) {
        var sql = "select * from admins";
        db.getResult(sql, [], function(results) {
            callback(results);
        });
    },
    validate: function(user, callback) {
        var sql = "select * from user where user_id = ? and password = ?";

        db.getResult(sql, [user.userId, user.password], function(result) {
            callback(result);
        });
    },
    insert: function(admin, callback) {
        var sql = "insert into admins values (?, ?, ?, ?)";
        db.execute(sql, [admin.id, admin.name, admin.address, admin.email], function(status) {
            callback(status);
        });
    },
    update: function(admin, callback) {
        var sql = "update admins set A_NAME = ?, A_ADDRESS = ?, A_EMAIL = ? where A_ID = ?";
        db.execute(sql, [admin.name, admin.address, admin.email, admin.id], function(status) {
            callback(status);
        });
    },
    getCatagory: function(callback) {
        var sql = "select * from catagory";
        db.getResult(sql, [], function(result) {
            callback(result);
        });
    },

}