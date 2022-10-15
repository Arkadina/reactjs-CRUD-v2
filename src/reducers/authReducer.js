import {
    GET_CURRENT_USER,
    DISCONNECT_USER,
    UPDATE_DATA,
} from "../actions/actionsTypes";

const initialState = {
    currentUser: false,
    email: "",
    emailVerified: "",
    id: "",
    crudData: "",
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER:
            console.log("GET_CURRENT_USER reducer");
            return {
                ...state,
                currentUser: true,
                email: action.payload.email,
                emailVerified: action.payload.emailVerified,
                crudData: action.payload.crudData,
                id: action.payload.id,
            };
        case DISCONNECT_USER:
            console.log("DISCONNECT_USER reducer");
            return {
                currentUser: false,
                email: "",
                emailVerified: "",
                id: "",
                crudData: "",
            };
        case UPDATE_DATA:
            console.log("UPDATE_CRUD reducer");
            return {
                ...state,
                crudData: action.payload.crud,
            };
        default:
            return state;
    }
};
