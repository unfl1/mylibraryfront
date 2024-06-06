// src/redux/reducers/userReducer.js
const initialState = {
    isLoggedIn: false,
    user: null,
  };
  
  function Userreducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }
  
  export default Userreducer;