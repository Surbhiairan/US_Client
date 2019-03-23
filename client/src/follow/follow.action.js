import { Follow } from './follow.constants';
import { feedConstant } from '../feed/feed.constants'
import { API_ROOT, URI } from '../config/config';

export const followCollection = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if (token != null) {
            dispatch({ type: Follow.FOLLOW_COLLECTION_LOADING })
            fetch(API_ROOT + URI.FOLLOW_COLLECTION, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(data => {
                    let followedCollection = [];
                    console.log("values---", values);
                    console.log("data----", data);
                    for(let i= 0; i< data.length; i++) {
                        let collection = data[i];
                        if(collection.id === values.collection_id) {
                            followedCollection.push({collection_id: collection.id});
                        }
                    }
                    console.log("followed collection----", followedCollection)
                    dispatch({
                        type: Follow.FOLLOW_COLLECTION_SUCCESS,
                        payload: followedCollection
                    })
                    dispatch({
                        type: feedConstant.FEEDS_AFTER_FOLLOW_SUCCESS,
                        payload: followedCollection
                    })
                    //history.push('/feeds');
                })
                .catch(err => {
                    dispatch({
                        type: Follow.FOLLOW_COLLECTION_FAILURE,
                        payload: err
                    })
                })
        } else {
            // history.push('/login');
        }
    }
}

export const unFollowCollection = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if (token != null) {
            fetch(API_ROOT + URI.FOLLOW_COLLECTION, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("data----", data)
                    dispatch({
                        type: feedConstant.FEEDS_AFTER_UNFOLLOW_SUCCESS,
                        payload: values
                    })
                    history.push('/feeds');
                })
                .catch(err => {
                    
                })
        } else {
            history.push('/login');
        }
    }
}

export const getFollowedCollections = () => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if (token != null) {
            dispatch({ type: Follow.GET_FOLLOW_COLLECTION_LOADING })
            fetch(API_ROOT + URI.FOLLOW_COLLECTION, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: Follow.GET_FOLLOW_COLLECTION_SUCCESS,
                        payload: data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: Follow.GET_FOLLOW_COLLECTION_FAILURE,
                        payload: err
                    })
                })
        } else {
            // history.push('/login');
        }
    }
}

