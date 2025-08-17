const Auth = (state, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "SET_UPDATE_RESPONSE":
      return {
        ...state,
        updateResponse: action.payload,
      };
    default:
      return state;
  }
};

export default Auth;
