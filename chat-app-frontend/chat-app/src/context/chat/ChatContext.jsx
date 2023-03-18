import React, { createContext, useReducer } from "react";
import { chatReducer } from "../chat/chatReducer";


export const ChatContext = createContext();

const initialState = {
    uid: '',
    chatActivo: null, // UID del usuario al que yo quiero enviar mensajes
    usuarios: [], // todos los usuarios de la base de datos
    mensajes: [], // Chat seleccionado
}

export const ChatProvider = ({ children }) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            {children}
        </ChatContext.Provider>
    );
};
