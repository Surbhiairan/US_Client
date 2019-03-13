import { profile } from './profile.constants';

const initialState = {
    createProfile: [],
    createProfileLoading: false,
    createProfileError: null,

    myProfile: [],
    myProfileLoading: false,
    myProfileError: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case profile.CREATE_PROFILE_LOADING: 
            return { ...state, createProfileLoading: true }
        case profile.CREATE_PROFILE_SUCCESS:
            return { ...state, createProfile: action.payload, createProfileLoading: false }
        case profile.CREATE_PROFILE_FAILURE: 
            return { ...state, createProfile: [], createProfileError: action.payload, createProfileLoading: false }
        
        case profile.MY_PROFILE_LOADING: 
            return { ...state, myProfileLoading: true }
        case profile.MY_PROFILE_SUCCESS:
            return { ...state, myProfile: action.payload, myProfileLoading: false }
        case profile.MY_PROFILE_FAILURE: 
            return { ...state, myProfile: [], myProfileError: action.payload, myProfileLoading: false }

        default:
            return state;
    }
}

export default reducer;