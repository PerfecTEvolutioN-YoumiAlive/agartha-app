export const actionTypes = {
  INIT: 'INIT'
};

export const initialState = {
  authenticated: true,
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return {
        ...state,
        authenticated: true,
        user: action.user
      }
    default:
      return state;
  }
};