import { feedConstant } from './feed.constants';

const initialState = {
    feeds: [],
    feedsLoading: false,
    feedsError: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case feedConstant.FEEDS_LOADING: 
            return { ...state, feedsLoading: true }
        case feedConstant.FEEDS_SUCCESS:
            return { ...state, feeds: action.payload.data, feedsLoading: false }
        case feedConstant.FEEDS_FAILURE: 
            return { ...state, feeds: [], feedsError: action.payload, feedsLoading: false }
       
        default:
            return state;
    }
}

export default reducer;