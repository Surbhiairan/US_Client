export const API_ROOT = 'http://localhost:5000/api/';

export const URI = {
    REGISTRATION: 'user',
    LOGIN: 'user/authenticate',
    F_LOGIN: 'core/flogin/',
    G_LOGIN: 'core/glogin/',
    PROFILE: 'userprofile',
    LOGOUT: 'core/logout/',
    USER_PROFILE: 'core/{0}/profile/',
    USER_COLLECTION: 'collection/?user_id={0}',
    COLLECTION: 'collection',
    GET_FEEDS: 'https://5c722f0dba65bb0014ebefb0.mockapi.io/getFeeds',
    POST: 'post',
    COLLECTION_DETAIL: 'collection/{0}',
    EDIT_COLLECTION: 'collection/{0}',
    DELETE_COLLECTION: 'collection/{0}',
    GET_COLLECTION_POSTS: 'collection/{0}/post',
    FOLLOW_USER: 'core/follower/',
}