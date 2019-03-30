import { profile } from './profile.constants';
import { API_ROOT, URI } from '../config/config';
import { StringFormat } from '../utils/StringFormat';

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

export const getMyProfile = (userId, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    console.log("user id", userId);
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: profile.MY_PROFILE_LOADING })
        fetch(StringFormat(API_ROOT + URI.GET_ANOTHER_USER_PROFILE, userId), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
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

export const editProfile = (values, history) => {
    console.log(values, "values in edit profile");
    let token = JSON.parse(localStorage.getItem('user')).token;
    console.log("values------", values)
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: profile.EDIT_PROFILE_LOADING })
        fetch(API_ROOT + URI.PROFILE, {
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
                type: profile.EDIT_PROFILE_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: profile.EDIT_PROFILE_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}
