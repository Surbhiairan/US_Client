import { admin } from './admin.constants';

const initialState = {
    allUsers: [],
    allUsersLoading: false,
    allUsersError: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case admin.FETCH_USERS_LOADING: 
            return { ...state, allUsersLoading: true }
        case admin.FETCH_USERS_SUCCESS:
            return { ...state, allUsers: action.payload, allUsersLoading: false }
        case admin.FETCH_USERS_FAILURE: 
            return { ...state, allUsers: [], allUsersError: action.payload, allUsersLoading: false }
        default:
            return state;
    }
}

export default reducer;