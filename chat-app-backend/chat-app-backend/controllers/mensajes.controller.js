const { request, response } = require("express");
const Mensaje = require('../models/mensaje')

const obtenerChat = async (req = request, res = response) => {

    const miId = req.uid;
    const mensajesDe = req.params.de;

    const ultimos30 = await Mensaje.find({
        $or: [
            {
                de: miId,
                para: mensajesDe
            },
            {
                de: mensajesDe,
                para: miId
            }
        ]
    })
        .sort({ createdAt: 'asc' })
        .limit(39)

    res.json({
        ok: true,
        mensajes: ultimos30
    })

}


module.exports = {
    obtenerChat
}