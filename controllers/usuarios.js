const {response} = require('express');

const usuariosGet = (req, res=response)=>{
    const  query = req.query;
    const { nombre, q, apikey, info='none' }=query;
    res.json({
    msg:'GET API-CONTROLLER',
    nombre,
    q,
    apikey,
    info
    });
}

const usuariosPost = (req, res)=>{

    const body = req.body;
    const {id, name, age}=body; // Se hace la destructuracion para usar solo la informacion requerida del body del req.
    res.json({
        msg:'POST API-CONTROLLER',
        // body
        id,
        name,
        age
    });
}

const usuariosPut = (req, res)=>{

    // const num = req.params.n;
    // const idt = req.params.id;

    const {id, n}= req.params;
    res.json({
        msg:'PUT API-CONTROLLER',
        n,
        id
    });
}

const usuariosPatch = (req, res)=>{
    res.json({
        msg:'PATCH API-CONTROLLER'});
}

const usuariosDelete = (req, res)=>{
    res.json({
        msg:'DELETE API-CONTROLLER'});
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}