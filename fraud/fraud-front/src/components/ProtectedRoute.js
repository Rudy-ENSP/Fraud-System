import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoginAdmin, isLoginClient } from './Login/login';

const ProtectedRoute = ({component: Component,path:Path,...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLoginAdmin || isLoginClient?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default ProtectedRoute;
