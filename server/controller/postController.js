const PostService = require('../service/postService');
class PostController{

    static addPost(req,res){
        let post = req.body;
        PostService.addPost(post).then( post =>{
            res.send(post);
        })
        .catch( err =>{
            res.status(501);
            res.send(err);
        })
    }

}

module.exports = PostController;