import { auth } from './auth.constants';

const initialState = {
    user: [],
    userLoading: false,
    userError: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case auth.REGISTRATION_LOADING: 
            return { ...state, userLoading: true }
        case auth.REGISTRATION_SUCCESS:
            return { ...state, user: action.payload, userLoading: false }
        case auth.REGISTRATION_FAILURE: 
            return { ...state, user: [], userError: action.payload, userLoading: false }

        case auth.LOGIN_LOADING: 
            return { ...state, userLoading: true }
        case auth.LOGIN_SUCCESS:
            return { ...state, user: action.payload, userLoading: false }
        case auth.LOGIN_FAILURE: 
            return { ...state, user: [], userError: action.payload, userLoading: false }
            
        default:
            return state;
    }
}

export default reducer;