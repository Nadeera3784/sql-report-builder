import React, {createContext, useReducer} from "react";

import AppReducer from './AppReducer';

export const AppContext = createContext();

const InitialState = {
    analytics      : {},
    auth_user      : {},
    events         : {},
    datasets       : {},
    cookie_consent : true,
   
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, InitialState);
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        {children}
      </AppContext.Provider>
    );
};
  
export default AppProvider;
  