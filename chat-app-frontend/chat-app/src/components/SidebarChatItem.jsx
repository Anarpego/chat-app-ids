import React, { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';

export const SidebarChatItem = ({ usuario }) => {

    const { chatState, dispatch } = useContext(ChatContext);
    const { chatActivo } = chatState

    const onClick = async () => {
        //console.log(usuario);
        dispatch({
            type: types.activarChat,
            payload: usuario.uid
        })

        // Cargar los mensajes
        const resp = await fetchConToken(`mensajes/${usuario.uid}`);
        //console.log(resp)

        dispatch({
            type: types.cargarChat,
            payload: resp.mensajes
        })

        // mover el scroll
    }

    return (
        <>
            {/* <!-- conversación activa inicio --> active_chat  */}
            <div className={`chat_list ${usuario.uid === chatActivo && 'active_chat'}`} onClick={onClick}>
                <div className="chat_people">
                    <div className="chat_img">
                        <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                    </div>
                    <div className="chat_ib">
                        <h5>{usuario.nombre}</h5>
                        {
                            usuario.online ?
                                <span className="text-success">Online</span> :
                                <span className="text-danger">Offline</span>
                        }


                    </div>
                </div>
            </div>
            {/* <!-- conversación activa Fin --> */}
        </>);
};
