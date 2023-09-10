import { authConstants } from "../actions/constants";

const initState = {
    name: 'Mrinmoy'
}

export default (state = initState, action ) => {

    console.log(action);
    // return state;
    switch(action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                ...action.payload
            }
            break;
    }

    return state;
}