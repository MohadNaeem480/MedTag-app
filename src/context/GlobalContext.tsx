import React, { createContext, useReducer, ReactNode } from "react";
import AppReducer from "./AppReducer";
import { User } from "../types/user"; // 👈 make sure this exists

// Define shape of context
interface GlobalContextType {
  userInfo: User | null;
  updateResponse: boolean;
  setUserInfo: (user: User | null) => void;
  setUpdateResponse: (update: boolean) => void;
}

// Initial state
const initialState: GlobalContextType = {
  userInfo: null,
  updateResponse: false,
  setUserInfo: () => {},
  setUpdateResponse: () => {},
};

// Create Context
const GlobalContext = createContext<GlobalContextType>(initialState);

// Provider Props
interface GlobalProviderProps {
  children: ReactNode;
}

// Provider Component
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const setUserInfo = (userInfo: User | null) => {
    dispatch({
      type: "SET_USER_INFO",
      payload: userInfo,
    });
  };

  const setUpdateResponse = (updateResponse: boolean) => {
    dispatch({
      type: "SET_UPDATE_RESPONSE",
      payload: updateResponse,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        userInfo: state.userInfo,
        setUserInfo,
        updateResponse: state.updateResponse,
        setUpdateResponse,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
