const { response, request } = require("express");
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generateJWT } = require("../helpers/jwt");

const crearUsuario = async (req = request, res = response) => {

    try {

        const { email, password } = req.body


        // verificar que el email no exista
        const existeEmail = await Usuario.findOne({ email })


        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        }

        const usuario = new Usuario(req.body)

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt)

        // Guardar usuario en base de datos
        await usuario.save()

        // Generar el JWT
        const token = await generateJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el admin'
        })
    }

}

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {


        // Verificar si existe el correo
        const usuarioDB = await Usuario.findOne({ email })

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Validar el password 
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validarPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'password no es correcto'
            });
        }

        // Generar el JWT
        const token = await generateJWT(usuarioDB.id)
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

};


const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generar un JWT
    const token = await generateJWT(uid)

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid)


    res.json({
        ok: true,
        token,
        usuario
    })


};

module.exports = {
    crearUsuario,
    login,
    renewToken
}