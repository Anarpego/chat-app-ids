import React from 'react';
import { fechaMensaje } from '../helpers/formatoFecha';

export const OutgoingMessage = ({msg}) => {
    return (

        <>
            {/* <!-- Mensaje enviado inicio --> */}
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p>{msg.mensaje}</p>
                    <span className="time_date">{fechaMensaje(msg.createdAt)}</span>
                </div>
            </div>
            {/* <!-- Mensaje enviado inicio --> */}
        </>
    );
};
