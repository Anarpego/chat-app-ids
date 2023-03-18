
const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req = request, res = response, next) => {

    try {

        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'no hay token en la petición'
            })
        }

        const { uid } = jwt.verify(token, process.env.JWT_KEY)
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }

}


module.exports = {
    validarJWT
}