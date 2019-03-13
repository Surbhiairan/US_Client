import { Post } from './post.constants';

const initialState = {
    createPost: [],
    createPostLoading: false,
    createPostError: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Post.CREATE_POST_LOADING: 
            return { ...state, createPostLoading: true }
        case Post.CREATE_POST_SUCCESS:
            return { ...state, createPost: action.payload, createPostLoading: false }
        case Post.CREATE_POST_FAILURE: 
            return { ...state, createPost: [], createPostError: action.payload, createPostLoading: false }
        default:
            return state;
    }
}

export default reducer;