class UserProfile{

    constructor(obj){
        this.id = obj && obj.id ? obj.id : null;
        this.userId = obj && obj.user_id ? obj.user_id : null;
        this.profileImg = obj && obj.profile_img ? obj.profile_img : null;
        this.bio = obj && obj.bio ? obj.bio : null;
        this.fLink = obj && obj.f_link ? obj.f_link : null;
        this.iLink = obj && obj.i_link ? obj.i_link : null;
        this.tLink = obj && obj.t_link ? obj.t_link : null;
        this.yLink = obj && obj.y_link ? obj.y_link : null;
        this.createDate = obj && obj.create_date ? obj.create_date : null;
        this.updateDate = obj && obj.update_date ? obj.update_date : null;
        this.createdBy = obj && obj.created_by ? obj.created_by : null;
        this.updatedBy = obj && obj.updated_by ? obj.updated_by : null;        
    }
}

module.exports = UserProfile;