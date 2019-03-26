import { admin } from './admin.constants';
import { API_ROOT, URI } from '../config/config';
import { StringFormat } from '../utils/StringFormat';

export const fetchAllUsers = (history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    let id = JSON.parse(localStorage.getItem('user')).id
    console.log("token---", token)
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: admin.FETCH_USERS_LOADING })
        fetch(API_ROOT + URI.GET_USERS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: admin.FETCH_USERS_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: admin.FETCH_USERS_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}