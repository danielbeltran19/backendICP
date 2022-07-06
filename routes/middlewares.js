const jwt = require('jwt-simple')
const moment = require('moment')


const checkToken = (req, res, next) => {

    if (!req.headers['user-token']) {
        return res.json({ error: 'Necesesitas incluir el user-token en la cabecera' })
    }

    const userToken = req.headers['user-token'];
    let payload = {};


    try {
        payload = jwt.decode(userToken, 'clave secreta')
    } catch (error) {
        return res.json({ error: 'el token es incorrecto' })
    }

    if (payload.expiredAt < moment().unix()) {
        return res.json({ error: 'el token ha expirado' })
    }


    req.usuarioId = payload.usuarioId;
    next();
}

module.exports = {
    checkToken: checkToken
}