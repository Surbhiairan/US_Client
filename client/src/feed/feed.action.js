import { feedConstant } from './feed.constants';
import { API_ROOT, URI } from '../config/config';

export const fetchFeeds = () => {
    return (dispatch) => {
        dispatch({ type: feedConstant.FEEDS_LOADING })
        fetch(URI.GET_FEEDS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "data");
            if(data.data) {
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