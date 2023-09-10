import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const login = (user)=>{
    return async (dispatch) => {

        dispatch({type: authConstants.LOGIN_REQUEST});

        const resp = await axios.post('/admin/signin', {
            ...user
        });
        if(resp.status === 200 ) {
            const { token, user } = resp.data;
            localStorage.setItem('token', token);
            localStorage.setItem( 'user', JSON.stringify(user) );
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token, user
                }
            });
        } 
        else {
            if( resp.status === 400 ) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload:{
                        error: resp.data.error
                    }
                });
            }
        }

        // sample examples we don't need this now
        /*
        dispatch({
            type: authConstants.LOGIN_REQUEST,
            payload: {
                // login: true
                ...user
            }

        });*/
    }
}

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if( token ) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token, user
                }
            });
        }
        else 
        {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload:{
                    error: "Failed to login"
                }
            });
        }
    }
}