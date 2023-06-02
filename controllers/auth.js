const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario =require('../models/usuario');
const { jwtGenerator } = require("../helpers/jwt-generator");


const login = async (req = request, res = response)=>{

    const {correo, password} = req.body;
    try{
        // VERIFICAR SI EL CORREO EXISTE EN BD
        const usuario = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                msg: 'usuario no valido- correo no se encuntra en la BD'
            });
        }
        // VERIFICAR  EL ESTADO DEL USUARIO: TRUE
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'usuario no valido- estado:false en la BD'
            });
        }
        // VERIFICAR LA CONTRASEÑA EN BD
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'contraseña no valida- contraseña no se encuentra en la BD'
            })
        }
        //GENERAR EL JWT
        const token = await jwtGenerator(usuario.id);

        res.json({
            msg: 'Login OK',
            usuario,
            token
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:'Comuniquese con el administrador del servidor'
        })

    }


}

module.exports = {
    login
}