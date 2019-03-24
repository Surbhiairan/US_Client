import { user } from './user.constant';

const initialState = {
    userDetails: [],
    userDetailsLoading: false,
    userDetailsError: null,

    userCollections: [],
    userCollectionsLoading: false,
    userCollectionsError: null,

    followUser: false,
    followUserLoading: false,
    followUserError: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case user.USER_DETAILS_LOADING:
            return { ...state, userDetailsLoading: true }
        case user.USER_DETAILS_SUCCESS:
            return { ...state, userDetails: action.payload, userDetailsLoading: false }
        case user.USER_DETAILS_FAILURE:
            return { ...state, userDetails: [], userDetailsError: action.payload, userDetailsLoading: false }

        case user.USER_COLLECTIONS_LOADING:
            return { ...state, userCollectionsLoading: true }
        case user.USER_COLLECTIONS_SUCCESS:
            return { ...state, userCollections: action.payload, userCollectionsLoading: false }
        case user.USER_COLLECTIONS_FAILURE:
            return { ...state, userCollections: [], userCollectionsError: action.payload, userCollectionsLoading: false }

        case user.FOLLOW_USER_LOADING:
            return { ...state, followUserLoading: true }
        case user.FOLLOW_USER_SUCCESS:
            return { ...state, followUser: action.payload, followUserLoading: false}
        case user.FOLLOW_USER_FAILURE:
            return { ...state, followUser: [], followUserError: action.payload, followUserLoading: false }

        case user.USER_COLLECTION_AFTER_FOLLOW_SUCCESS: 
            return { 
                ...state,
                userCollections: state.userCollections.map((item, index) => {
                    if(item.id === action.payload[0].collection_id) {
                        return {
                            ...item,
                            isFollowed: true
                        }
                    }
                    return item;
                })
            }

            case user.USER_COLLECTION_AFTER_UNFOLLOW_SUCCESS: 
            return { 
                ...state,
                userCollections: state.userCollections.map((item, index) => {
                    if(item.id === action.payload.collection_id) {
                        return {
                            ...item,
                            isFollowed: false
                        }
                    }
                    return item;
                })
            }
        default:
            return state;
    }
}

export default reducer;