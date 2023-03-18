import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';

export const SendMessage = () => {


    const [mensaje, setMensaje] = useState('');
    const { socket } = useContext(SocketContext);
    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);

    const onChange = ({ target }) => {

        setMensaje(target.value)
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (mensaje.length === 0) {
            return
        } else {
            //console.log('mensaje')

            // {
            //     de: // _id del usuario enviando el mensaje
            //     para: // _id del usuario que recibe el mensaje
            //     mensaje: // lo que quiero enviar
            // }

            // Hacer el dispatch del mensaje
            socket.emit('mensaje-personal', {
                de: auth.uid,
                para: chatState.chatActivo,
                mensaje
            })

            // Despues de enviar el mensaje
            setMensaje('')
        }


    }

    return (

        <form onSubmit={onSubmit}>
            {/* <!-- Enviar mensaje Inicio --> */}
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        value={mensaje}
                        onChange={onChange}
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        Enviar
                    </button>
                </div>
            </div>
            {/* <!-- Enviar mensaje Fin --> */}
        </form>
    );
};
