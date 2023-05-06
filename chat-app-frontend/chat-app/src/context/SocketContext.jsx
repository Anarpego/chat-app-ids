
import React, { useContext, useEffect, createContext } from 'react';
import { types } from '../types/types';
import { useSocket } from '../hooks/useSocket'
import { AuthContext } from './AuthContext';
import { ChatContext } from './chat/ChatContext';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://umgsocial.tech/');
    const { auth } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext)

    // alguien se conecta
    useEffect(() => {

        // Disparar conexion del socket
        if (auth.logged) {
            
            conectarSocket();
        }

    }, [auth, conectarSocket]);


    // Alguien se desconecta
    useEffect(() => {
        if (!auth.logged) {
            desconectarSocket();
        }
    }, [auth, desconectarSocket]);


    // Escuchar los cambios en los usuarios conectados
    useEffect(() => {

        socket?.on('lista-usuarios', (usuarios) => {
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            })
        })

    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje) => {
            //console.log(mensaje)
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            });

            scrollToBottomAnimated('mensajes')
        })
    }, [socket, dispatch]);



    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}