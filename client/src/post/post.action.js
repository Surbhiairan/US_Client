import { Post } from './post.constants';
import { API_ROOT, URI } from '../config/config';
import { StringFormat } from '../utils/StringFormat';

export const createPost = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: Post.CREATE_POST_LOADING })
        fetch(API_ROOT + URI.POST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'JWT '+token
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: Post.CREATE_POST_SUCCESS,
                payload: data
            })
            history.push('/feeds');
        })
        .catch(err => {
            dispatch({
                type: Post.CREATE_POST_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}

export const getPostComments = (id, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: Post.POST_COMMENTS_LOADING })
        fetch(StringFormat(API_ROOT + URI.POST_COMMENTS, id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: Post.POST_COMMENTS_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: Post.POST_COMMENTS_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}

export const getPostDetails = (id, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: Post.POST_DETAIL_LOADING })
        fetch(StringFormat(API_ROOT + URI.POST_DETAIL, id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: Post.POST_DETAIL_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: Post.POST_DETAIL_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}