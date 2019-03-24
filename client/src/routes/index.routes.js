import Registration from '../auth/views/Registration';
import Login from '../auth/views/Login';
import CreateProfile from '../profile/views/CreateProfile';
import EmailConfirmation from '../auth/views/EmailConfirmation';
import DashBoard from '../layouts/dashboard';

var indexRoutes = [
    { path: '/', component: DashBoard},
    { path: '/feeds', component: DashBoard},
    { path: '/mycollections', component: DashBoard},
    { path: '/following', component: DashBoard},
    { path: '/createCollection', component: DashBoard},
    { path: '/collection/:id', component: DashBoard},
    { path: '/editCollection/:id', component: DashBoard},
    { path: '/createPost', component: DashBoard},
    { path: '/createPost/video', component: DashBoard},
    { path: '/createPost/link', component: DashBoard},
    { path: '/createPost/image', component: DashBoard},
    { path: '/createPost/quote', component: DashBoard},
    { path: '/post/:id', component: DashBoard},
    { path: '/editProfile', component: DashBoard},
    { path: '/myprofile', component: DashBoard},
    { path: '/user/:id', component: DashBoard},

    { path: '/register', component: Registration},
    { path: '/login', component: Login},
    { path: '/profile', component: CreateProfile },
    { path: '/mailsent', component: EmailConfirmation },
]

export default indexRoutes;