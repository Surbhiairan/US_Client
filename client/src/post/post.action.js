import { Post } from './post.constants';
import { API_ROOT, URI } from '../config/config';

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