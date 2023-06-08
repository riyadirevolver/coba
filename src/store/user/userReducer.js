import { SET_USER } from "../constants";

const INIT_STATE = {
    fullname: "",
    companyId: "",
};

const setUser = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                fullname: action.payload.fullname,
                companyId: action.payload.companyId,
            };
        default:
            return state;
    }
};

export default setUser;
