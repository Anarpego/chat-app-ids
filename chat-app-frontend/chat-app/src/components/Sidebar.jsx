import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SidebarChatItem } from './SidebarChatItem';


export const Sidebar = () => {

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);
    //console.log(auth)
    const { uid } = auth;


    return (
        <>
            {/* <!-- Sidebar inicio --> */}
            <div className="inbox_chat">

                {
                    chatState.usuarios
                        .filter(user => user.uid !== uid)
                        .map((usuario) => (
                            <SidebarChatItem key={usuario.uid} usuario={usuario} />
                        ))
                }


                {/* <!-- Espacio extra para scroll --> */}
                <div className="extra_space"></div>

            </div>
            {/* <!-- Sidebar Fin --> */}

        </>
    );
};
