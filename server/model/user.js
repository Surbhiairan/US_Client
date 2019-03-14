class User{
    constructor(obj){
        this.id = obj && obj.id ? obj.id : null;
        this.firstName = obj && obj.first_name ? obj.first_name : null;
        this.email = obj && obj.email ? obj.email : null;
        this.role = obj && obj.role ? obj.role : null;
        this.isActive = obj && obj.is_active ? (obj.is_active == 1) ? true : false : false;
        this.isProfile = obj && obj.is_profile ? (obj.is_profile == 1) ? true : false : false;
        
    }
}

module.exports = User;