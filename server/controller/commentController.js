const commentService = require('../service/commentService');
class commentController {


    static addComment(req,res){
        let userId = req.body['appUser']['id'];
        let payload = {           
            'post_id' : req.body['post_id'],
            'user_id' : userId,
            'comment' : req.body['comment'],
        }
        commentService.addComment(payload).then(comment =>{
            res.send(comment);
        })
        .catch( err => {
            res.status(500);
            res.send(err);
        })
    }

    static getCommentForPost(req,res){       
        let postId = req.params['postId'];
        commentService.getCommentForPost(postId).then( comments => {
            res.send(comments);
        })
        .catch( err =>{
            res.status(500);
            res.send(err);
        })
    }

}

module.exports = commentController