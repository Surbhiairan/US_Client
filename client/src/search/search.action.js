import { API_ROOT, URI } from '../config/config';
import { Search } from './search.constant';

export const getSearchResults = (query) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return (dispatch) => {
        if (token != null) {
            dispatch({ type: Search.SEARCH_RESULTS_LOADING })
            fetch(API_ROOT + URI.SEARCH + query, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: Search.SEARCH_RESULTS_SUCCESS,
                        payload: data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: Search.SEARCH_RESULTS_FAILURE,
                        payload: err
                    })
                })
        } else {
            // history.push('/login');
        }
    }
}