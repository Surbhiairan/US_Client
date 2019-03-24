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
            return { 
                ...state, 
                feeds: action.payload, 
                feedsLoading: false 
            }
        case feedConstant.FEEDS_FAILURE: 
            return { ...state, feeds: [], feedsError: action.payload, feedsLoading: false }

        // case feedConstant.FEEDS_AFTER_FOLLOW_LOADING:
        //     return {
        //         ...state, feeds: [], feedsLoading: true
        //     }
        case feedConstant.FEEDS_AFTER_FOLLOW_SUCCESS: 
            return {
                ...state, 
                feeds: {
                    ...state.feeds,
                    collections: 
                        state.feeds.collections && state.feeds.collections.map((item, index) => {
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
                //...state.feeds,
                
            }

        case feedConstant.FEEDS_AFTER_UNFOLLOW_SUCCESS: 
            return {
                ...state,
                feeds: {
                    ...state.feeds,
                    collections: state.feeds.collections && state.feeds.collections.map((item, index) => {
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
            }
       
            case feedConstant.FEEDS_AFTER_FAV_POST_SUCCESS: 
            return {
                ...state, 
                feeds: {
                    ...state.feeds,
                    posts: 
                        state.feeds.posts.map((item, index) => {
                            console.log("post id----", action.payload[0].post_id)
                            console.log("Item id----", item.id)

                            if(item.id === action.payload[0].post_id) {
                                return {
                                    ...item,
                                    isFavorited: true
                                }
                            }
                            return item;
                        })
                    }
                //...state.feeds,
                
            }

            case feedConstant.FEEDS_AFTER_UNFAV_POST_SUCCESS: 
            return {
                ...state, 
                feeds: {
                    ...state.feeds,
                    posts: 
                        state.feeds.posts.map((item, index) => {
                            console.log("post id----", action.payload.post_id)
                            console.log("Item id----", item.id)

                            if(item.id === action.payload.post_id) {
                                return {
                                    ...item,
                                    isFavorited: false
                                }
                            }
                            return item;
                        })
                    }
                //...state.feeds,
                
            }
        default:
            return state;
    }
}

export default reducer;