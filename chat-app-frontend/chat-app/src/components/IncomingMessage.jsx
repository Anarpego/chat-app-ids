import React from 'react';
import { fechaMensaje } from '../helpers/formatoFecha';

export const IncomingMessage = ({msg}) => {

    
    return (
        <>
            {/* <!-- Mensaje recibido Inicio --> */}
            <div className="incoming_msg">
                <div className="incoming_msg_img">
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{msg.mensaje}</p>
                        <span className="time_date">{fechaMensaje(msg.createdAt)}</span>
                    </div>
                </div>
            </div>
            {/* <!-- Mensaje recibido Fin --> */}
        </>
    );
};
