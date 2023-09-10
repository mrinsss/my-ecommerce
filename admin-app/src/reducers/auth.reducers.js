import { authConstants } from "../actions/constants";

const initState = {
    token:null,
    user:{
        firstName:'',
        lastName:'',
        email:'',
        picture:'',
        fullname:'',
    },
    authenticate:false,
    authenticating:false,
    loading:true,
}

// export default (state = initState, action ) => {
const authRed = (state = initState, action ) => {
    console.log(action);
    // return state;
    switch(action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                // ...action.payload
                authenticating: true
            }
            break;

        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;    

        default:
            return state;
    }

    return state;
}

export default authRed;