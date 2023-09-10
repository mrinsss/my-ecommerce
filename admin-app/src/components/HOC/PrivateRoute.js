import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = (props) => {
//     return <Route {...props} />
// }

// const PrivateRoute = ({component: Component, ...rest}) => {
//     return <Route {...rest} component={(props) => {
//         const token = window.localStorage.getItem('token');
//         if(token) {
//             return <Component {...props} />
//         } 
//         else {
//             return <Navigate to={'/signin'} />
//         }
//     }} />
// }

const PrivateRoute = () => {
    const token = window.localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/signin" />;
}

// const PrivateRoute = (children) => {
//     const token = window.localStorage.getItem('token');
//     return token ? <>{children}</> : <Navigate to="/signin" />;
// }

export default PrivateRoute;