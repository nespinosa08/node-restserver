const {response} = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req, res=response)=>{
    const  query = req.query;
    const { limite=5, desde=0 }=query;
    const state = {estado:true};

    // const usuarios = await Usuario.find(state)
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    
    // const total = await Usuario.countDocuments(state);


    // FORMA MAS EFICIENTE. SE EJECUTA MAS RAPIDA
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(state),
        Usuario.find(state)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
    msg:'GET API-CONTROLLER',
    total,
    usuarios
    });
}

const usuariosPost = async(req, res=response)=>{    
    

    // TOMANDO SOLO LA INFORMACION REQUERIDA DEL BODY
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // ENCRIPTACION DE CONTRASEÑA
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // GUARDAR EN BASE DE DATOS
    await usuario.save();
    res.json({
        msg:'POST API-CONTROLLER',
        usuario
    });
}

const usuariosPut = async(req, res)=>{
    const {id}= req.params;
    // EXTRAER LAS PROPIEDADES DEL REQ QUE NO SE QUIEREN ACTUALIZAR
    const { _id, password, google, correo, ...resto} = req.body;
    if (password){
        // ENCRIPTAR LA CONTRASEÑA
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true});
    res.json({
        msg:'PUT API-CONTROLLER',
        usuario
    });
}

const usuariosPatch = (req, res)=>{
    res.json({
        msg:'PATCH API-CONTROLLER'});
}

const usuariosDelete = async(req, res)=>{

    const {id}= req.params;
    // BORRA EL REGISTRO DE FORMA PERMANENTE
    // const usuario = await Usuario.findByIdAndDelete(id);

    // NO BORRA EL REGISTRO PERMANENTEMENTE. SOLO LE CAMBIA EL ESTADO A FALSE
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    
    res.json({
        msg:'DELETE API-CONTROLLER',
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}