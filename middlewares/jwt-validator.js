const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const jwtValidator = async (req=request, res=response, next )=>{

    //Nota: el token debe venir en los header de la peticion. por ejemplo: x-token, x-apikey
    //El desarrollador de front debe solicitar el xtoken en los headers.
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    //VERIFICAR SI EL JWT ES VALIDO
    try{
        //obtiene el uid que viene en el jwt
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //obtiene el usuario que corresponde con el uid que viene del jwt
        const usuario = await Usuario.findById(uid);

        if (!usuario){
            return res.status(401).json({
                msg:'Token no valido - Usuario no existeen en BD'
            })
        }

        //verificar si el usuario tiene estado en true
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - Estado en false'
            })
        }

        //asignar el usuario autenticado como usuario del la peticion (request)
        req.usuario = usuario

        next();

    }catch(err){
        console.log(err);
        res.status(401).json({
            msg:'El token no es válido'
        })
    }


}

module.exports = {
    jwtValidator
}