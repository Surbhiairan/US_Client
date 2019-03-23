export const API_ROOT = 'http://localhost:5000/api/';

export const URI = {
    REGISTRATION: 'user',
    LOGIN: 'user/authenticate',
   
    PROFILE: 'userprofile',
    GET_PROFILE: 'userprofile/{0}',

    USER_COLLECTION: 'user/{0}/collection',
    COLLECTION: 'collection',



    GET_FEEDS: 'https://5c722f0dba65bb0014ebefb0.mockapi.io/getFeeds',
    POST: 'post',
    POST_COMMENTS: 'post/{0}/comments',
    POST_DETAIL: 'post/{0}',

    COLLECTION_DETAIL: 'collection/{0}',
    EDIT_COLLECTION: 'collection/{0}',
    DELETE_COLLECTION: 'collection/{0}',
    GET_COLLECTION_POSTS: 'collection/{0}/post',
    GET_COLLECTION_FOLLOWERS: 'collection/{0}/followers',

    FOLLOW_USER: 'core/follower/',
    GET_ALL_FAV_POST: 'favPost',
    FOLLOW_COLLECTION: 'favcollection',
    FEEDS: 'feed',

    SEARCH: 'search?key='
}