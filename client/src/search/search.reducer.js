import { Search } from './search.constant';

const initialState = {
    searchResults: {},
    searchResultsLoading: false,
    searchResultsError: null
}

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case Search.SEARCH_RESULTS_LOADING:
            return { ...state, searchResultsLoading: true}
        case Search.SEARCH_RESULTS_SUCCESS:
            return { ...state, searchResults: action.payload, searchResultsLoading: false}
        case Search.SEARCH_RESULTS_FAILURE:
            return { ...state, searchResults: [], searchResultsError: action.payload, searchResultsLoading: false }
        
        default:
            return state
    }
}

export default reducer