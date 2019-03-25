const DB = require('../util/db');
const Comment = require('../model/comment');
const NotificationService = require('../service/notificationService');

class commentService {

    static getCommentById(id) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query('select * from comment where id = ?', [id], (err, data) => {
                    DB.release(connection);
                    if (err) {
                        reject(err);
                    } else {
                        let comment = new Comment(data[0]);
                        resolve(comment);
                    }
                })
            })
        })
    }



    // static addComment(comment) {

    //     return new Promise((resolve, reject) => {
    //         var connection;
    //         DB.getConnection().then(conn => {
    //             connection = conn;
    //             return DB.beginTransaction(connection);
    //         })
    //             .then(() => {
    //                 resolve(comment);
    //             })
    //             .catch(err => {
    //                 reject(err);
    //             })
    //     })
    // }

    static addComment(comment) {
        return new Promise((resolve, reject) => {
            var connection;
            var insertedId;
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    comment = DB.addAttributesForNew(comment);
                    connection.query(
                        `INSERT INTO comment SET ?`, comment, (err, data) => {
                            if (err) {
                                DB.rollbackTransaction(connection);
                                DB.release(connection);
                                reject(err);
                            } else {
                                insertedId = data.insertId;
                                DB.commitTransaction(connection).then(() => {
                                    NotificationService.addCommentNotification(comment['post_id'],comment['user_id']).then(() =>{
                                        commentService.getCommentById(insertedId).then(comment => {
                                            resolve(comment);
                                        })
                                    })                                    
                                })
                            }
                        });
                })
                .catch(err => {
                    reject(err);
                })

        })
    }

    static getCommentForPost(postId) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(
                    `select c.id,c.post_id,c.comment,c.create_date,c.update_date,c.created_by,c.updated_by,u.first_name,u.email 
                    from comment c inner join user u on c.user_id = u.id 
                    where post_id = ?;`, postId, (err, data) => {
                        DB.release(connection);
                        if (err) {
                            reject(err);
                        } else {
                            let comments = []
                            comments = data.map(item => {
                                let comment = new Comment(item);
                                comment['authorName'] = item['first_name'];
                                comment['authorEmail'] = item['email'];
                                return comment;
                            })
                            resolve(comments);
                        }
                    });
            })
                .catch(err => {
                    reject(err);
                })

        })
    }


}

module.exports = commentService;