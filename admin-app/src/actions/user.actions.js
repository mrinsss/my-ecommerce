
import axios from "../helpers/axios";
import { userConstants } from "./constants";

export const signup = (user)=>{
    return async (dispatch) => {

        dispatch({type: userConstants.USER_SIGNUP_REQUEST});

        const resp = await axios.post('/admin/signup', {
            ...user
        });
        if(resp.status === 201 ) {
            const { message } = resp.data;
            dispatch({
                type: userConstants.USER_SIGNUP_SUCCESS,
                payload:{
                    message
                }
            });
        } 
        else {
            if( resp.status === 400 ) {
                dispatch({
                    type: userConstants.USER_SIGNUP_FAILURE,
                    payload:{
                        error: resp.data.error
                    }
                });
            }
        }

    }
}