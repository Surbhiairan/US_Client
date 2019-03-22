import { collection } from './collection.constants';

const initialState = {
    myCollection: [],
    myCollectionLoading: false,
    myCollectionError: null,

    newCollection: [],
    newCollectionLoading: false,
    newCollectionError: null,

    collectionDetail: [],
    collectionDetailLoading: false,
    collectionDetailError: null,

    posts: [],
    postsLoading: false,
    postsError: null,

    deleteCollection: [],
    deleteCollectionLoading: false,
    deleteCollectionError: null,

    collectionFollowers: [],
    collectionFollowersLoading: false,
    collectionFollowersError: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case collection.MY_COLLECTION_LOADING: 
            return { ...state, myCollectionLoading: true }
        case collection.MY_COLLECTION_SUCCESS:
            return { ...state, myCollection: action.payload, myCollectionLoading: false }
        case collection.MY_COLLECTION_FAILURE: 
            return { ...state, myCollection: [], myCollectionError: action.payload, myCollectionLoading: false }
       
        case collection.NEW_COLLECTION_LOADING: 
            return { ...state, newCollectionLoading: true }
        case collection.NEW_COLLECTION_SUCCESS:
            return { ...state, newCollection: action.payload, newCollectionLoading: false }
        case collection.NEW_COLLECTION_FAILURE: 
            return { ...state, newCollection: [], newCollectionError: action.payload, newCollectionLoading: false }

        case collection.COLLECTION_DETAIL_LOADING: 
            return { ...state, collectionDetailLoading: true }
        case collection.COLLECTION_DETAIL_SUCCESS:
            return { ...state, collectionDetail: action.payload, collectionDetailLoading: false }
        case collection.COLLECTION_DETAIL_FAILURE: 
            return { ...state, collectionDetail: [], collectionDetailError: action.payload, collectionDetailLoading: false }

        case collection.POSTS_LOADING: 
            return { ...state, postsLoading: true }
        case collection.POSTS_SUCCESS:
            return { ...state, posts: action.payload, postsLoading: false }
        case collection.POSTS_FAILURE: 
            return { ...state, posts: [], postsError: action.payload, postsLoading: false }

        case collection.DELETE_COLLECTION_LOADING: 
            return { ...state, deleteCollectionLoading: true }
        case collection.DELETE_COLLECTION_SUCCESS:
            return { ...state, deleteCollection: action.payload, deleteCollectionLoading: false }
        case collection.DELETE_COLLECTION_FAILURE: 
            return { ...state, deleteCollection: [], deleteCollectionError: action.payload, deleteCollectionLoading: false }

        case collection.GET_COLLECTION_FOLLOWERS_LOADING: 
            return { ...state, collectionFollowersLoading: true }
        case collection.GET_COLLECTION_FOLLOWERS_SUCCESS:
            return { ...state, collectionFollowers: action.payload, collectionFollowersLoading: false }
        case collection.GET_COLLECTION_FOLLOWERS_FAILURE: 
            return { ...state, collectionFollowers: [], collectionFollowersError: action.payload, collectionFollowersLoading: false }

        default:
            return state;
    }
}

export default reducer;