const AWS = require('../util/aws');
class PostService {

    static getPostByID(id){
        return new Promise( (resolve,reject) => {
            var connection = connection;
            DB.getConnection().then( (connect) => {} )
        })
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
                            AWS.uploadImage(post.post_img).then(url => {
                                resolve(url);
                            })
                        } else {
                            resolve(null);
                        }
                    });
                })
                .then((imageURL) => {
                    post.post_img = imageURL;
                    connection.query(
                        `INSERT INTO post SET ?`, post, (err, data) => {
                            if (err) {
                                DB.rollbackTransaction(connection);
                                DB.release(connection)
                                reject(err);
                            } else if (data) {
                                insertedId = data.insertId;
                               
                            }
                        });
                }).catch(err => {
                    reject(err);
                });
        });


    }
}
module.exports = PostService;