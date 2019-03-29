import { user } from './user.constant';
import { Follow } from '../follow/follow.constants';
import { API_ROOT, URI } from '../config/config';
import { StringFormat } from '../utils/StringFormat';

export const followUser = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    console.log("token---", token)
    return (dispatch) => {
        if (token != null) {
            dispatch({ type: user.FOLLOW_USER_LOADING })
            fetch(API_ROOT + URI.FOLLOW_USER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(data => {
                    let followedUser = [];
                    console.log("values---", values);
                    console.log("data----", data);
                    for(let i= 0; i< data.length; i++) {
                        let user = data[i];
                        if(user.followingId === parseInt(values.following_id)) {
                            followedUser.push({following_id: user.followingId});
                        }
                    }
                    dispatch({
                        type: user.FOLLOW_USER_SUCCESS,
                        payload: true
                    })
                    dispatch({
                        type: Follow.USER_AFTER_FOLLOW_SUCCESS,
                        payload: data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: user.FOLLOW_USER_FAILURE,
                        payload: err
                    })
                })
        } else {
            history.push('/login');
        }
    }
}

export const getAnotherUserProfile = (id, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    console.log("token---", token)
    return (dispatch) => {
        if (token != null) {
            dispatch({ type: user.USER_DETAILS_LOADING })
            fetch(StringFormat(API_ROOT + URI.GET_ANOTHER_USER_PROFILE, id), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: user.USER_DETAILS_SUCCESS,
                        payload: data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: user.USER_DETAILS_FAILURE,
                        payload: err
                    })
                })
        } else {
            history.push('/login');
        }
    }
}

export const fetchUserCollections = (id, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    console.log("token---", token)
    return (dispatch) => {
        if (token != null) {
            dispatch({ type: user.USER_COLLECTIONS_LOADING })
            fetch(StringFormat(API_ROOT + URI.USER_COLLECTION, id), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
            })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: user.USER_COLLECTIONS_SUCCESS,
                    payload: data
                })
            })
            .catch(err => {
                dispatch({
                    type: user.USER_COLLECTIONS_FAILURE,
                    payload: err
                })
            })
        } else {
            history.push('/login');
        }
    }
}

export const getFollowedUser = () => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if (token != null) {
            dispatch({ type: Follow.GET_FOLLOW_COLLECTION_LOADING })
            fetch(API_ROOT + URI.MY_FOLLOWERS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: Follow.GET_FOLLOWED_USER_SUCCESS,
                        payload: data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: Follow.GET_FOLLOWED_USER_FAILURE,
                        payload: err
                    })
                })
        } else {
            // history.push('/login');
        }
    }
}

export const unFollowUser = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if (token != null) {
            fetch(API_ROOT + URI.FOLLOW_USER, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                dispatch({
                    type: Follow.USER_AFTER_UNFOLLOW_SUCCESS,
                    payload: values
                })
                //res.json()
            })
            
            .catch(err => {
                console.log("error--", err)
            })
        } else {
            history.push('/login');
        }
    }
}

