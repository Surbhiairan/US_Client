class Collection{
    constructor(obj){
        this.id = obj && obj.id ? obj.id : null;
        this.userId = obj && obj.user_id ? obj.user_id : null;
        this.collectionTitle = obj && obj.collection_title ? obj.collection_title : null;
        this.collectionText = obj && obj.collection_text ? obj.collection_text : null;
        this.collectionImage = obj && obj.collection_image ? obj.collection_image : null;        
        this.createDate = obj && obj.create_date ? obj.create_date : null;
        this.updateDate = obj && obj.update_date ? obj.update_date : null;
        this.createdBy = obj && obj.created_by ? obj.created_by : null;
        this.updatedBy = obj && obj.updated_by ? obj.updated_by : null;        
    }
}

module.exports = Collection;