const PostService = require('../service/postService');
class PostController {

    static addPost(req, res) {
        let post = req.body;
        PostService.addPost(post).then(post => {
            res.send(post);
        })
            .catch(err => {
                res.status(500);
                res.send(err);
            })
    }

    static getPostById(req, res) {
        let postId = req.params['postId'];
        PostService.getPostByID(postId).then(post => {
            res.send(post);
        })
            .catch(err => {
                res.status(500);
                res.send(err);
            })
    }

    static getAllPostByCollectionId(req, res) {
        let collectionId = req.params['collectionId'];
        PostService.getAllPostByCollectionId(collectionId).then(post => {
            res.send(post);
        })
            .catch(err => {
                res.status(500);
                res.send(err);
            })
    }

    static editPost(req, res) {
        let postId = req.params['postId'];
        let post = req.body;
        PostService.editPost(postId, post).then(post => {
            res.send(post);
        })
            .catch(err => {
                res.status(500);
                res.send(err);
            })
    }

    
}

module.exports = PostController;