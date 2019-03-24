import Feeds from '../feed/views/Feeds';

import MyCollections from '../collection/views/MyCollections';
import CreateCollection from '../collection/views/CreateCollection';
import CollectionDetail from '../collection/views/CollectionDetail';
import EditCollection from '../collection/views/EditCollection';
import UserCollectionDetail from '../user/views/UserCollectionDetail';

import CreatePost from '../post/views/CreatePost';
import VideoPost from '../post/views/VideoPost';
import ImagePost from '../post/views/ImagePost';
import QuotePost from '../post/views/QuotePost';
import LinkPost from '../post/views/LinkPost';
import PostDetail from '../post/views/PostDetail';

import Following from '../follow/views/Followings';
//import EditProfile from '../profile/views/EditProfile';
import MyProfile from '../profile/views/MyProfile';
import UserProfile from '../user/views/UserProfile';

export const dashboardRoutes = [
    { 
        path: '/feeds', 
        component: Feeds, 
        name: 'Feeds'
    },
    { 
        path: '/createPost', 
        component: CreatePost, 
        name: 'Create Post'
    },
    { 
        path: '/mycollections', 
        component: MyCollections, 
        name: 'My Collection'
    },
    {
        path: '/following',
        component: Following,
        name: 'Following'
    },
    
    { redirect: true, path: "/", pathTo: "/login", name: "Login" }
];

export const otherRoutes = [
    { 
        path: '/createcollection', 
        component : CreateCollection, 
        name: 'Create Collection'
    },
    {
        path: '/createPost/video',
        component: VideoPost,
        name: 'Video Post'
    },
    {
        path: '/createPost/image',
        component: ImagePost,
        name: 'Image Post'
    },
    {
        path: '/createPost/link',
        component: LinkPost,
        name: 'Link Post'
    },
    {
        path: '/createPost/quote',
        component: QuotePost,
        name: 'Quote Post'
    },
    {   path: '/post/:id', 
        component : PostDetail, 
        name: 'Post Detail'
    },
    {   path: '/collection/:id', 
        component : UserCollectionDetail, 
        name: 'Collection Detail'
    },
    {  path: '/editCollection/:id', 
        component : EditCollection, 
        name: 'Edit Collection'
    },
    {  path: '/myprofile', 
        component : MyProfile, 
        name: 'My Profile'
    },
    {  path: '/user/:id', 
        component : UserProfile, 
        name: 'User Profile'
    },
    {
        path: '/myCollection/:id',
        component: CollectionDetail,
        name: 'My Collection Detail'
    }

]

