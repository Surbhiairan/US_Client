import { Post } from './post.constants';
import { feedConstant } from '../feed/feed.constants'
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
                'token': token
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

export const addComment = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: Post.ADD_COMMENT_LOADING })
        fetch(API_ROOT + URI.ADD_COMMENT, {
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
                type: Post.ADD_COMMENT_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: Post.ADD_COMMENT_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}

export const addFavoritePost = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if (token != null) {
            dispatch({ type: Post.ADD_FAVORITE_POST_LOADING })
            fetch(API_ROOT + URI.ADD_FAV_POST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(data => {
                    let favPost = [];
                    console.log("values---", values);
                    console.log("data----", data);
                    for(let i= 0; i< data.length; i++) {
                        let post = data[i];
                        if(post.postId === values.post_id) {
                            favPost.push({post_id: post.postId});
                        }
                    }
                    console.log("followed post----", favPost)
                    dispatch({
                        type: Post.ADD_FAVORITE_POST_SUCCESS,
                        payload: favPost
                    })
                    dispatch({
                        type: feedConstant.FEEDS_AFTER_FAV_POST_SUCCESS,
                        payload: favPost
                    })
                    //history.push('/feeds');
                })
                .catch(err => {
                    dispatch({
                        type: Post.ADD_FAVORITE_POST_FAILURE,
                        payload: err
                    })
                })
        } else {
            history.push('/login');
        }
    }
}

export const addUnfavoritePost = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if (token != null) {
            fetch(API_ROOT + URI.ADD_FAV_POST, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data, "data in unfav");
                    dispatch({
                        type: feedConstant.FEEDS_AFTER_UNFAV_POST_SUCCESS,
                        payload: values
                    })
                    //history.push('/feeds');
                })
                .catch(err => {
                   console.log(err);
                })
        } else {
            history.push('/login');
        }
    }
}
