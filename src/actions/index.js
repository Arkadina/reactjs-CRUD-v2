import { GET_CURRENT_USER, DISCONNECT_USER, UPDATE_DATA } from "./actionsTypes";

export const userConnect = ({ email, emailVerified, crudData }, id) => {
    console.log("userConnect action");
    return {
        type: GET_CURRENT_USER,
        payload: {
            email,
            emailVerified,
            crudData,
            id,
        },
    };
};

export const userDisconnect = () => {
    console.log("userDisconnect action");
    return {
        type: DISCONNECT_USER,
    };
};

export const updateData = (crud) => {
    console.log("UPDATE_DATA action");
    return {
        type: UPDATE_DATA,
        payload: {
            crud,
        },
    };
};
