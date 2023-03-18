const { usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    grabarMensaje } = require("../controllers/socket.controller");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {

            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);

            if (!valido) {
                console.log('socket no identificado')
                return socket.disconnect();
            }

            //console.log('cliente conectado -> ', uid);
            console.log('---->',uid);
            await usuarioConectado(uid);

            // Unir al usuario a una sala de socket.io
            socket.join(uid);

            //console.log('Se conecto: ', usuario.nombre)

            //    1. Validar el JWT
            //         * Si el token no es valido, desconectar

            //    2. Saber que usuario está activo mediante el UID

            //    3. Emitir todos los usuarios
            this.io.emit('lista-usuarios', await getUsuarios())

            //    4. Socket join

            //    5. Escuchar cuando el cliente manda un mensaje ('mensaje-personal')
            socket.on('mensaje-personal', async (payload) => {
                //console.log(payload)

                const mensaje = await grabarMensaje(payload)

                this.io.to(payload.para).emit('mensaje-personal', mensaje);
                this.io.to(payload.de).emit('mensaje-personal', mensaje);
                //console.log(mensaje)
            })

            //    6. Disconnect
            // * marcar en la bd que el usuario se desconecto

            //    7. Emitir los usuarios conectados


            socket.on('disconnect', async () => {
                const usuariodes = await usuarioDesconectado(uid)
                this.io.emit('lista-usuarios', await getUsuarios());
                //console.log('Se desconecto: ', usuariodes)
            })

        });
    }


}


module.exports = Sockets;