const DB = require('../util/db');
const Collection = require('../model/collection');
const Post = require('../model/post');

class FeedService {

    static getFeddCollections(userId) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(`select c.id,fu.following_id,c.user_id,c.collection_title,c.collection_text,c.collection_image,
                u.first_name,u.email, c.create_date,c.created_by,c.update_date,c.updated_by ,
                (select count(*) from fav_collection fc where fc.collection_id = c.id) total_fav
                from follow_user fu inner join user u on fu.following_id = u.id
                inner join collection c on c.user_id = fu.following_id
                and fu.user_id = ? and c.id not in (select fv.collection_id from fav_collection fv where fv.user_id = ?)`, [userId,userId], (err, data) => {
                        DB.release(connection);
                        if (err) {
                            reject(err);
                        } else {
                            let collections;
                            if (data && data.length > 0) {
                                collections = data.map(item => {
                                    let collection = new Collection(item);
                                    collection['authorName'] = item['first_name'];
                                    collection['authorEmail'] = item['email'];
                                    collection['totalFavorites'] = item['total_fav'];
                                    return collection;
                                })
                            }
                            resolve(collections);
                        }
                    })
            })
                .catch(err => {
                    reject(err);
                })
        });
    }

    static getFeddPosts(userId) {
        return new Promise((resolve, reject) => {
            var connection;
            DB.getConnection().then(conn => {
                connection = conn;
                connection.query(`select p.id,p.collection_id,p.post_type,p.post_title,p.post_text,p.post_tags,p.post_video_url,
                p.post_img,p.post_link_url,p.create_date,p.update_date,p.created_by,p.updated_by,
                c.collection_title,u.id user_id,u.first_name ,u.email,
                (select count(*) from fav_post fp where fp.post_id = p.id) fav_count,
                (select count(*) from comment cm where cm.post_id = p.id) comment_count from post p
                inner join collection c on p.collection_id = c.id
                inner join fav_collection fc on fc.collection_id = c.id
                inner join user u on fc.user_id = u.id
                where u.id = ? and p.id not in (select post_id from fav_post where user_id = ?) ;`, [userId,userId], (err, data) => {
                        DB.release(connection);
                        if (err) {
                            reject(err);
                        } else {
                            let posts;
                            if (data && data.length > 0) {
                                posts = data.map(item => {
                                    let post = new Post(item);
                                    post['authorName'] = item['first_name'];
                                    post['authorEmail'] = item['email'];
                                    post['collectionTitle'] = item['collection_title']
                                    post['totalFavorites'] = item['fav_count']
                                    post['totalComments'] = item['comment_count']
                                    return post;
                                })
                            }
                            resolve(posts);
                        }
                    })
            })
                .catch(err => {
                    reject(err);
                })
        });
    }
    static getFeeds(userId) {
        var result = {
            collections: [],
            posts: []
        }
        return new Promise((resolve, reject) => {
            FeedService.getFeddCollections(userId).then(colls => {
                result.collections = colls;
                FeedService.getFeddPosts(userId).then( posts =>{
                    result.posts = posts;
                    resolve(result);
                });
            })
                .catch(err => {
                    reject(err);
                })
        })

    }
}

module.exports = FeedService;
