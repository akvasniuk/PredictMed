import {lazy} from 'react';

import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import {Navigate} from "react-router";

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

const isAuthenticated = localStorage.getItem("user");

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout/>,
    children: [
        {
            path: 'login',
            element: isAuthenticated ? <Navigate to="/"/> : <AuthLogin/>
        },
        {
            path: 'register',
            element: isAuthenticated ? <Navigate to="/"/> : <AuthRegister/>
        }
    ]
};

export default LoginRoutes;
