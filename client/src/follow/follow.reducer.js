import { Follow } from './follow.constants';

const initialState = {
    followCollection: [],
    followCollectionError: null,
    followCollectionLoading: false,

    getFollowCollection: [],
    getFollowCollectionError: null,
    getFollowCollectionLoading: false
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
        
        default:
            return state;
    }
}

export default reducer;