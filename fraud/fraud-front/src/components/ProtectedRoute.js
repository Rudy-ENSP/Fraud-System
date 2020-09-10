import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoginAdmin, isLoginClient } from './Login/login';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLoginAdmin || isLoginClient?
                <Component {...props} />
            : <Redirect to="/Acceuil" />
        )} />
    );
};

export default ProtectedRoute;
