export const API_ROOT = 'http://localhost:5000/api/';

export const URI = {
    REGISTRATION: 'user',
    LOGIN: 'user/authenticate',
   
    PROFILE: 'userprofile',
    GET_PROFILE: 'userprofile/{0}',
    LOGOUT: 'core/logout/',

    USER_COLLECTION: 'collection/?user_id={0}',
    COLLECTION: 'collection',

    GET_FEEDS: 'https://5c722f0dba65bb0014ebefb0.mockapi.io/getFeeds',
    POST: 'post',

    COLLECTION_DETAIL: 'collection/{0}',
    EDIT_COLLECTION: 'collection/{0}',
    DELETE_COLLECTION: 'collection/{0}',
    GET_COLLECTION_POSTS: 'collection/{0}/post',

    GET_COLLECTION_FOLLOWERS: 'collection/{0}/favcollection',
    FOLLOW_USER: 'core/follower/',
    GET_ALL_FAV_POST: 'favPost',
    FOLLOW_COLLECTION: 'favcollection',
    FEEDS: 'feed',

    SEARCH: 'search?key='
}