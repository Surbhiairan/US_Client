const path = require('path');
const mysql = require('mysql');
const config = require('../config/env');
const pool = mysql.createPool(`${config.db_url}?connectionLimit=${config.db_connection_limit}
&dateStrings=true&multipleStatements=true
&acquireTimeout=${config.db_acquire_timeout}
&connectTimeout=${config.db_connect_timeout}`);

/** DB Model Base Class */
class DB {

    static getConnection() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) { console.log(err); return reject(err); }
                return resolve(connection);
            });
        });
    }

    static release(connection) {
        if (!DB.isReleased(connection)) {
            connection.release();
        }
    }

    static isReleased(connection) {
        return pool._freeConnections.indexOf(connection) !== -1;
    }

    static rollbackTransaction(connection) {
        return new Promise((resolve, reject) => {
          connection.rollback((err) => {
            if (!DB.isReleased(connection)) { connection.release(); }
    
            if (err) { return reject(err); }
            return resolve();
          });
        });
      }
    
      static commitTransaction(connection) {
        return new Promise((resolve, reject) => {
          connection.commit((err) => {
            if (err) { return reject(err); }
    
            if (!DB.isReleased(connection)) { connection.release(); }
            return resolve();
          });
        });
      }

      static beginTransaction(connection) {
        return new Promise((resolve, reject) => {
          try {
            connection.beginTransaction(err => {
              if (err) { throw err; }
    
              return resolve();
            });
          }
          catch(error) {
            if (!DB.isReleased(connection)) { connection.release(); }
            console.log(error);
            return reject(error);
          }
        });
      }
      
      static addAttributesForNew(object){
        object['create_date'] = new Date();
        object['created_by'] = 'Test User';
        return object;
      }

      static addAttributesForEdit(object){
             object['update_date'] = new Date();
              object['updated_by'] = 'Test User';
              return object;
      }

}

module.exports = DB;