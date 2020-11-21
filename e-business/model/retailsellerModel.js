var db = require('./db');

module.exports = {
    get: function(retailsellerID, callback) {
        var sql = "select * from retailsellerpi where user_id = ?";

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
    getAll: function(callback) {
        var sql = "select * from admins";
        db.getResult(sql, [], function(results) {
            callback(results);
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

}