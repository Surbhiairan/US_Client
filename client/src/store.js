import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import profileReducer from './profile/profile.reducer';
import collectionReducer from './collection/collection.reducer';
import feedReducer from './feed/feed.reducer';
import post from './post/post.reducer';
import user from './user/user.reducer';
import follow from './follow/follow.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    collection: collectionReducer, 
    feeds: feedReducer,
    post: post,
    user: user,
    follow: follow
})

export default rootReducer