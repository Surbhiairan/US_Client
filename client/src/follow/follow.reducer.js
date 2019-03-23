import { Follow } from './follow.constants';

const initialState = {
    followCollection: [],
    followCollectionError: null,
    followCollectionLoading: false,

    getFollowCollection: [],
    getFollowCollectionError: null,
    getFollowCollectionLoading: false,

    getFollowedUser: [],
    getFollowedUserLoading: false,
    getFollowedUserError: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Follow.FOLLOW_COLLECTION_LOADING:
            return { ...state, followCollectionLoading: true}
        case Follow.FOLLOW_COLLECTION_SUCCESS: 
            return { ...state, followCollection: action.payload, followCollectionLoading: false }
        case Follow.FOLLOW_COLLECTION_FAILURE:
            return { ...state, followCollection: [], followCollectionError: action.payload, followCollectionLoading: false }
        
        case Follow.GET_FOLLOW_COLLECTION_LOADING:
            return { ...state, getFollowCollectionLoading: true }
        case Follow.GET_FOLLOW_COLLECTION_SUCCESS:
            return { ...state, getFollowCollection: action.payload, getFollowCollectionLoading: false }
        case Follow.GET_FOLLOW_COLLECTION_FAILURE:
            return { ...state, getFollowCollection: [], getFollowCollectionError: action.payload, getFollowCollectionLoading: false}
        
        case Follow.GET_FOLLOWED_USER_LOADING:
            return { ...state, getFollowedUserLoading: true }
        case Follow.GET_FOLLOWED_USER_SUCCESS:
            return { ...state, getFollowedUser: action.payload, getFollowedUserLoading: false }
        case Follow.GET_FOLLOWED_USER_FAILURE:
            return { ...state, getFollowedUser: [], getFollowedUserError: action.payload, getFollowedUserLoading: false}
        
        case 'RESET_FOLLOW_COLLECTION':
            return { ...state, followCollection: []}
            default:
            return state;
    }
}

export default reducer;