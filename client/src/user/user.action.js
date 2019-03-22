import { user } from './user.constant';
import { API_ROOT, URI } from '../config/config';
import { StringFormat } from '../utils/StringFormat';

export const followUser = (userDetails, history) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    console.log("token---", token)
    return (dispatch) => {
        if(token!=null){
        dispatch({ type: user.FOLLOW_USER_LOADING })
        fetch(StringFormat(API_ROOT + URI.FOLLOW_USER, userDetails.id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'JWT '+token
            },
            body: JSON.stringify(
                {"follower_id":userDetails.id}
            )
        })
        .then(res => res.json())
        .then(data => {
            if(data.detail === 'Signature has expired.') {
                dispatch({
                    type: user.FOLLOW_USER_FAILURE,
                    payload: false
                })
                 return history.push('/login')
            }
            dispatch({
                type: user.FOLLOW_USER_SUCCESS,
                payload: true
            })
        })
        .catch(err => {
            dispatch({
                type: user.FOLLOW_USER_FAILURE,
                payload: err
            })
        })
    }else{
        history.push('/login');
    }
    }
}