
import React, { useReducer } from 'react';
import GlobalStateContext from './GlobalTinodeState';
 
const initialState = {
  tinode:null,
  topic: "topic123",
  userId:"u123",
};
 
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return initialState;
  }
};
 
const GlobalTinodeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
 
export default GlobalTinodeProvider;