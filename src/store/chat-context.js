import { createContext, useReducer } from "react";
import { useAuth } from "./auth-context";
  
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                // chatId: "123456789"
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};
  