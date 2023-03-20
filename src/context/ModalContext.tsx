import React, {useMemo, createContext, useReducer} from "react";

export const ModalContext = createContext<any| undefined>(undefined);

const initialState = false;
const reducer = (state: boolean, action: any) => {
  switch(action.type) {
    case true:
      document.body.className = 'modalOpen';
      return true;
    case false:
      document.body.className = '';
      return false;
    default:
        return state;
  }
};

export const ModalProvider = (props: any) => {
  const [modalState, modalDispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { modalState, modalDispatch };
  }, [modalState, modalDispatch]);
  return (
    <ModalContext.Provider value={contextValue}>
        {props.children}
    </ModalContext.Provider>
  );
}