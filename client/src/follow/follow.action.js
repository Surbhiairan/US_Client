import { Follow } from './follow.constants';
import { API_ROOT, URI } from '../config/config';

export const followCollection = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
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
            dispatch({
                type: Follow.FOLLOW_COLLECTION_SUCCESS,
                payload: data
            })
            //history.push('/feeds');
        })
        .catch(err => {
            dispatch({
                type: Follow.FOLLOW_COLLECTION_FAILURE,
                payload: err
            })
        })
    }else{
       // history.push('/login');
    }
    }
}

export const unFollowCollection = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: Follow.UN_FOLLOW_COLLECTION_LOADING })
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
            dispatch({
                type: Follow.UN_FOLLOW_COLLECTION_SUCCESS,
                payload: data
            })
            history.push('/feeds');
        })
        .catch(err => {
            dispatch({
                type: Follow.UN_FOLLOW_COLLECTION_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}