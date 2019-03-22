import { feedConstant } from './feed.constants';
import { API_ROOT, URI } from '../config/config';

export const fetchFeeds = () => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        dispatch({ type: feedConstant.FEEDS_LOADING })
        dispatch({ type: 'RESET_FOLLOW_COLLECTION'})
        fetch(API_ROOT + URI.FEEDS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "data");
            if(data) {
                dispatch({
                    type: feedConstant.FEEDS_SUCCESS,
                    payload: data
                })
            } else {
                dispatch({
                    type: feedConstant.FEEDS_FAILURE,
                    payload: data.message
                })
            }
        })
        .catch(err => {
            dispatch({
                type: feedConstant.FEEDS_FAILURE,
                payload: err
            })
        })
    }
}