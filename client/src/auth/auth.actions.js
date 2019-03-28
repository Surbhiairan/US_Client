import { auth } from './auth.constants';
import { API_ROOT, URI } from '../config/config';

export const register = (values, history) => {
    return (dispatch) => {
        dispatch({ type: auth.REGISTRATION_LOADING })
        fetch(API_ROOT + URI.REGISTRATION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertId) {
                dispatch({
                    type: auth.REGISTRATION_SUCCESS,
                    payload: data
                })
                history.push('/mailsent');
            } else {
                dispatch({
                    type: auth.REGISTRATION_FAILURE,
                    payload: data.message
                })
                alert("server error")
            }
            
        })
        .catch(err => {
            dispatch({
                type: auth.REGISTRATION_FAILURE,
                payload: err
            })
        })
    }
}

export const login = (values, history) => {
    return (dispatch) => {
        dispatch({ type: auth.LOGIN_LOADING })
        fetch(API_ROOT + URI.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            if(data.id) {
                dispatch({
                    type: auth.LOGIN_SUCCESS,
                    payload: data
                })
                localStorage.setItem('user',JSON.stringify(data));
                if(data.role === 'admin') {
                    history.push('/admin/users');
                } else {
                    if(data.isProfile === true){
                        history.push('/feeds');
                    } 
                    else history.push('/profile');
                }
            } else {
                dispatch({
                    type: auth.LOGIN_FAILURE,
                    payload: data.message
                })
                alert(data.message)
            }
            
        })
        .catch(err => {
            dispatch({
                type: auth.LOGIN_FAILURE,
                payload: err
            })
        })
    }
}

export const facebookLogin = (values, history) => {
    return (dispatch) => {
        dispatch({ type: auth.LOGIN_LOADING })
        fetch(API_ROOT + URI.SOCIAL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            if(data.id) {
                dispatch({
                    type: auth.LOGIN_SUCCESS,
                    payload: data
                })
                localStorage.setItem('user',JSON.stringify(data))
                if(data.isProfile === true){
                    history.push('/feeds');
                }
                else history.push('/profile');
            } else {
                dispatch({
                    type: auth.LOGIN_FAILURE,
                    payload: data.message
                })
                alert(data.message)
            }
        })
        .catch(err => {
            dispatch({
                type: auth.LOGIN_FAILURE,
                payload: err
            })
        })
    }
}

export const googleLogin = (values, history) => {
    return (dispatch) => {
        dispatch({ type: auth.LOGIN_LOADING })
        fetch(API_ROOT + URI.SOCIAL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            if(data.id) {
                dispatch({
                    type: auth.LOGIN_SUCCESS,
                    payload: data
                })
                localStorage.setItem('user',JSON.stringify(data))
                if(data.isProfile === true){
                    history.push('/feeds');
                }
                else history.push('/profile');
            } else {
                dispatch({
                    type: auth.LOGIN_FAILURE,
                    payload: data.message
                })
                alert(data.message)
            }
        })
        .catch(err => {
            dispatch({
                type: auth.LOGIN_FAILURE,
                payload: err
            })
        })
    }
}