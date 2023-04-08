import React, {useMemo, createContext, useReducer} from "react";

export const PostContext = createContext<any| undefined>(undefined);

const initialState = {};
const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'SET_DATA':
        return action.payload;
    default:
        return state;
  }
};

export const PostProvider = (props: any) => {
  const [postState, postDispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { postState, postDispatch };
  }, [postState, postDispatch]);
  return (
    <PostContext.Provider value={contextValue}>
        {props.children}
    </PostContext.Provider>
  );
}