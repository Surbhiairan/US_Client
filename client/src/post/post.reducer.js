import { Post } from './post.constants';

const initialState = {
    createPost: [],
    createPostLoading: false,
    createPostError: null,

    postComments: [],
    postCommentsLoading: false,
    postCommentsError: null,

    postDetails: [],
    postDetailsLoading: false,
    postDetailsError: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Post.CREATE_POST_LOADING: 
            return { ...state, createPostLoading: true }
        case Post.CREATE_POST_SUCCESS:
            return { ...state, createPost: action.payload, createPostLoading: false }
        case Post.CREATE_POST_FAILURE: 
            return { ...state, createPost: [], createPostError: action.payload, createPostLoading: false }
        
        case Post.POST_COMMENTS_LOADING: 
            return { ...state, postCommentsLoading: true }
        case Post.POST_COMMENTS_SUCCESS:
            return { ...state, postComments: action.payload, postCommentsLoading: false }
        case Post.POST_COMMENTS_FAILURE: 
            return { ...state, postComments: [], postCommentsError: action.payload, postCommentsLoading: false }

        case Post.POST_DETAIL_LOADING: 
            return { ...state, postDetailsLoading: true }
        case Post.POST_DETAIL_SUCCESS:
            return { ...state, postDetails: action.payload, postDetailsLoading: false }
        case Post.POST_DETAIL_FAILURE: 
            return { ...state, postDetails: [], postDetailsError: action.payload, postDetailsLoading: false }

        case Post.ADD_COMMENT_LOADING: 
            return { ...state, postCommentsLoading: true }
        case Post.ADD_COMMENT_SUCCESS:
            return { 
                ...state, 
                postComments: state.postComments.concat(action.payload),
                postCommentsLoading: false 
            }
        case Post.ADD_COMMENT_FAILURE: 
            return { ...state, postComments: [], postCommentsError: action.payload, postCommentsLoading: false }

        default:
            return state;
    }
}

export default reducer;