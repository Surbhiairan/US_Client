const UserService = require('./userService');
const CollectionService = require('./collectionService');
const PostService = require('../service/postService');
class SearchService{

    static search(key){
        let searchResult = {
            users : [],
            collections : [],
            posts : []
        }
        return new Promise( (resolve,reject) =>{
            var users;
            var collections;
            var posts;
            UserService.search(key).
            then( data => {
                users = data;
                return CollectionService.search(key)
            })
            .then( data =>{
                collections = data;
                return PostService.search(key);
            })
            .then( data => {
                posts = data;
                searchResult.users = users;
                searchResult.collections = collections;
                searchResult.posts = posts;
                resolve(searchResult);
            })            
            .catch(err => {
                reject(err);
            })
        })
    }
}

module.exports = SearchService;