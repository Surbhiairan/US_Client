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
            const newItem = action.payload;
            const newState = state.followCollection.slice();
      
            newState.push(newItem);
            //return newState;
            return { 
                ...state, 
                followCollection: newState, 
                followCollectionLoading: false 
            }
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
        
        case Follow.FOLLOW_AFTER_FOLLOW_SUCCESS: 
            return {
                 ...state,
                 getFollowCollection: 
                    state.getFollowCollection.map((item, index) => {
                        console.log("collection id----", action.payload[0].collection_id)
                        console.log("Item id----", item.id)

                        if(item.id === action.payload[0].collection_id) {
                            return {
                                ...item,
                                isFollowed: true
                            }
                        }
                        return item;
                    })
                }

        case Follow.FOLLOW_AFTER_UNFOLLOW_SUCCESS:
            return {
                ...state,
                getFollowCollection: 
                    state.getFollowCollection.map((item, index) => {
                        console.log("collection id----", action.payload.collection_id)
                        console.log("Item id----", item.id)

                        if(item.id === action.payload.collection_id) {
                            return {
                                ...item,
                                isFollowed: false
                            }
                        }
                        return item;
                    })
            }

            case Follow.USER_AFTER_FOLLOW_SUCCESS: 
            return {
                 ...state,
                 getFollowedUser: 
                    state.getFollowedUser.map((item, index) => {
                        console.log("collection id----", action.payload.following_id)
                        console.log("Item id----", item.id)

                        if(item.id === parseInt(action.payload.following_id)) {
                            return {
                                ...item,
                                isFollowed: true
                            }
                        }
                        return item;
                    })
                }

        case Follow.USER_AFTER_UNFOLLOW_SUCCESS:
            return {
                ...state,
                getFollowedUser: 
                    state.getFollowedUser.map((item, index) => {
                        console.log("collection id----", action.payload.following_id)
                        console.log("Item id----", item.id)

                        if(item.id === action.payload.following_id) {
                            return {
                                ...item,
                                isFollowed: false
                            }
                        }
                        return item;
                    })
            }
        
        case 'RESET_FOLLOW_COLLECTION':
            return { ...state, followCollection: []}
            default:
            return state;
    }
}

export default reducer;