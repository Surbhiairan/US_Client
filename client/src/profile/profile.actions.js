import { profile } from './profile.constants';
import { API_ROOT, URI } from '../config/config';

export const createProfile = (values, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    console.log("values------", values)
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: profile.CREATE_PROFILE_LOADING })
        fetch(API_ROOT + URI.PROFILE, {
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
                type: profile.CREATE_PROFILE_SUCCESS,
                payload: data
            })
            history.push('/feeds');
        })
        .catch(err => {
            dispatch({
                type: profile.CREATE_PROFILE_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}

export const getMyProfile = (history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: profile.MY_PROFILE_LOADING })
        fetch(API_ROOT + URI.PROFILE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'JWT '+token
            },
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: profile.MY_PROFILE_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: profile.MY_PROFILE_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}