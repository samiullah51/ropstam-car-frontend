import { LOG_IN, LOG_OUT } from "./userTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, user: action.user };
    case LOG_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
