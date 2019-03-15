class FavCollection{
    constructor(obj){
        this.id = obj && obj.id ? obj.id : null;
        this.userId = obj && obj.user_id ? obj.user_id : null;
        this.collectionId = obj && obj.collection_id ? obj.collection_id : null;
        this.createDate = obj && obj.create_date ? obj.create_date : null;
        this.updateDate = obj && obj.update_date ? obj.update_date : null;
        this.createdBy = obj && obj.created_by ? obj.created_by : null;
        this.updatedBy = obj && obj.updated_by ? obj.updated_by : null;        
    }
}

module.exports = FavCollection;