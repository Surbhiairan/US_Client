import { Follow } from './follow.constants';

const initialState = {
    followCollection: [],
    followCollectionError: null,
    followCollectionLoading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Follow.FOLLOW_COLLECTION_LOADING:
            return { ...state, followCollectionLoading: true}
        case Follow.FOLLOW_COLLECTION_SUCCESS: 
            return { ...state, followCollection: action.payload, followCollectionLoading: false }
        case Follow.FOLLOW_COLLECTION_FAILURE:
            return { ...state, followCollection: [], followCollectionError: action.payload, followCollectionLoading: false }
        default:
            return state;
    }
}

export default reducer;