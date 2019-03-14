const AWS = require('../util/aws');
const DB = require('../util/db');
const Post = require('../model/post');
class PostService {

    static getPostByID(id) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then((conn) => {
                connection = conn;
                connection.query('select * from post where id = ? ', [id], (err, data) => {
                    DB.release(connection);
                    if (err) {
                        reject(err);
                    } else {
                        let post = {};
                        if (data && data.length > 0) {
                            post = new Post(data[0]);
                        }
                        resolve(post);
                    }
                })
            })
        })
    }

    static getAllPostByCollectionId(collectionId){
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then((conn) => {
                connection = conn;
                connection.query('select * from post where collection_id = ? ', [collectionId], (err, data) => {
                    DB.release(connection);
                    if (err) {
                        reject(err);
                    } else {
                        let posts = [];
                        if (data && data.length > 0) {
                            posts = PostService.mapToPosts(data);
                        }
                        resolve(posts);
                    }
                })
            })
        })
    }

    static mapToPosts(data){
            let posts = data.map( item => {
                return new Post(item);
            })
            return posts;
    }
    
    static addPost(post) {
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().then(conn => {
                connection = conn;
                return DB.beginTransaction(connection);
            })
                .then(() => {
                    return new Promise((resolve, reject) => {
                        if (post.post_img && post.post_type == 1) {
                            let imageName = new Date().getTime()+".png";
                            AWS.uploadImage(post.post_img,imageName).then(url => {
                                resolve(url);
                            })
                        } else {
                            resolve(null);
                        }
                    });
                })
                .then((imageURL) => {
                    post.post_img = imageURL;
                    post = DB.addAttributesForNew(post);
                    connection.query(
                        `INSERT INTO post SET ?`, post, (err, data) => {
                            if (err) {
                                DB.rollbackTransaction(connection);
                                DB.release(connection)
                                reject(err);
                            } else if (data) {
                                DB.commitTransaction(connection).then(() => {                                   
                                let insertedId = data.insertId;
                                PostService.getPostByID(insertedId).then(post => {
                                    resolve(post);
                                })
                                })
                                
                            };
                        })
                })
                .catch(err => {
                    reject(err);
                });

        });
    }

}

module.exports = PostService;