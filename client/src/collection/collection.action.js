import { collection } from './collection.constants';
import { API_ROOT, URI } from '../config/config';
import { StringFormat } from '../utils/StringFormat';

export const fetchMyCollections = (history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    let id = JSON.parse(localStorage.getItem('user')).id
    console.log("token---", token)
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: collection.MY_COLLECTION_LOADING })
        fetch(StringFormat(API_ROOT + URI.USER_COLLECTION, id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.detail === 'Signature has expired.') {
                dispatch({
                    type: collection.MY_COLLECTION_FAILURE,
                    payload: data
                })
                 return history.push('/login')
            }
            dispatch({
                type: collection.MY_COLLECTION_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: collection.MY_COLLECTION_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}

export const newCollection = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: collection.NEW_COLLECTION_LOADING })
        fetch(API_ROOT + URI.COLLECTION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: collection.NEW_COLLECTION_SUCCESS,
                payload: data
            })
            history.push('/mycollections');
        })
        .catch(err => {
            dispatch({
                type: collection.NEW_COLLECTION_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}

export const editCollection = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    let id = values.id;
    console.log(values, "edit");
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: collection.NEW_COLLECTION_LOADING })
       // dispatch({ type: collection.COLLECTION_DETAIL_LOADING })
        fetch(StringFormat(API_ROOT + URI.EDIT_COLLECTION, id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: collection.NEW_COLLECTION_SUCCESS,
                payload: data
            })
            history.push('/mycollections');
        })
        .catch(err => {
            dispatch({
                type: collection.NEW_COLLECTION_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}

export const deleteCollection = (id, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: collection.DELETE_COLLECTION_LOADING })
        fetch(StringFormat(API_ROOT + URI.DELETE_COLLECTION, id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'JWT '+token
            },
        })
        .then(data => {
            console.log("data", data);
            if(data.status===204){
                dispatch({
                    type: collection.DELETE_COLLECTION_SUCCESS,
                    payload: data
                })
                history.push('/mycollections');
            } else {
                dispatch({
                    type: collection.DELETE_COLLECTION_FAILURE,
                    payload: data
                })
            }
        })
        .catch(err => {
            dispatch({
                type: collection.DELETE_COLLECTION_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}

export const getCollectionDetail = (id, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: collection.COLLECTION_DETAIL_LOADING })
        fetch(StringFormat(API_ROOT + URI.COLLECTION_DETAIL, id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.detail === 'Signature has expired.') {
                dispatch({
                    type: collection.COLLECTION_DETAIL_FAILURE,
                    payload: data
                })
                 return history.push('/login')
            }
            dispatch({
                type: collection.COLLECTION_DETAIL_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: collection.COLLECTION_DETAIL_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}

export const getPostsList = (id, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: collection.POSTS_LOADING })
        fetch(StringFormat(API_ROOT + URI.GET_COLLECTION_POSTS, id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'JWT '+token
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.detail === 'Signature has expired.') {
                dispatch({
                    type: collection.POSTS_FAILURE,
                    payload: data
                })
                 return history.push('/login')
            }
            dispatch({
                type: collection.POSTS_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: collection.POSTS_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}

export const getCollectionFollowing = (id, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: collection.GET_COLLECTION_FOLLOWERS_LOADING })
        fetch(StringFormat(API_ROOT + URI.GET_COLLECTION_FOLLOWERS, id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: collection.GET_COLLECTION_FOLLOWERS_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: collection.GET_COLLECTION_FOLLOWERS_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}
