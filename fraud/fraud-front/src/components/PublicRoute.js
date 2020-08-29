import React,{useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './Login/login';

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const [Login, setIsLogin] = useState(isLogin);
   
    return (
        <Route {...rest} render={props => (
            Login?
                <Redirect to="/tickets" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;