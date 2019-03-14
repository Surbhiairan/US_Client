class Collection{
    constructor(obj){
        this.id = obj && obj.id ? obj.id : null;
        this.collectionId = obj && obj.collection_id ? obj.collection_id : null;
        this.postType = obj && obj.post_type ? obj.post_type : null;
        this.postTitle = obj && obj.post_title ? obj.post_title : null;
        this.postText = obj && obj.post_text ? obj.post_text : null; 
        this.postTags = obj && obj.post_tags ? obj.post_tags : null;     
        this.postVideoUrl = obj && obj.post_video_url ? obj.post_video_url : null;     
        this.postImg = obj && obj.post_img ? obj.post_img : null;     
        this.postText = obj && obj.post_text ? obj.post_text : null;     
        this.postLinkUrl = obj && obj.post_link_url ? obj.post_link_url : null;  
        this.createDate = obj && obj.create_date ? obj.create_date : null;
        this.updateDate = obj && obj.update_date ? obj.update_date : null;
        this.createdBy = obj && obj.created_by ? obj.created_by : null;
        this.updatedBy = obj && obj.updated_by ? obj.updated_by : null;        
    }
}

module.exports = Collection;


