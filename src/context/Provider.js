import React, {createContext, useReducer} from 'react';
import authReducer from './reducers/authReducer.js';
import authInitialState from './initalsStates/authInitialState.js';
import contactsReducer from './reducers/contactsReducer.js';
import contactsInitialState from './initalsStates/contactsInitialState.js';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [contactsState, contactsDispatch] = useReducer(
    contactsReducer,
    contactsInitialState,
  );

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        contactsState,
        contactsDispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
