const {response} = require('express');


const Usuario = require('../models/usuario');
const { Category } = require('../models');


const categoriesGetAll = async (req, res=response)=>{
    const  query = req.query;
    const { limite=5, desde=0 }=query;
    const state = {estado:true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(state),
        Category.find(state)
            .populate('usuario', ['correo', 'nombre'])
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
    msg:'TODAS LAS CATEGORIAS',
    total,
    categories
    });
}

const categoriesGet = async (req, res=response)=>{
    const {id}= req.params;
 
    const category = await Category.findById(id).populate('usuario', ['nombre', 'correo']);
    res.json({
        msg:'CATEGORIA POR ID',
        category
    });
}



const categoriesPost = async(req, res=response)=>{    
    const nombre = req.body.nombre.toUpperCase();

    const categoryDB = await Category.findOne({nombre});
    if (categoryDB){
        return res.status(400).json({
            msg: `La categoria ${categoryDB.nombre} ya existe en la base de datos`
        })
    };

    // Preparar la data a guardar (nombre y usuario que esta creandola categoria)
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    // crear la categoria
    const category = new Category(data);
    
    // guardar la categoria
    await category.save();

    res.status(201).json({
        msg:'CATEGORIA CREADA',
        category
    });
}

const categoriesPut = async(req, res=response)=>{
    const {id}= req.params;
    // EXTRAER LAS PROPIEDADES DEL REQ QUE NO SE QUIEREN ACTUALIZAR
    const { _id, estado, usuario, ...resto} = req.body;
    resto.nombre = resto.nombre.toUpperCase();
 
    const category = await Category.findByIdAndUpdate(id, resto, {new:true}).populate('usuario', ['nombre', 'correo']);
    res.json({
        msg:'CATEGORIA ACTUALIZADA',
        category,
    });
}

const categoriesDelete = async(req, res=response)=>{
    const {id}= req.params;
    // BORRA EL REGISTRO DE FORMA PERMANENTE
    // const usuario = await Usuario.findByIdAndDelete(id);

    // NO BORRA EL REGISTRO PERMANENTEMENTE. SOLO LE CAMBIA EL ESTADO A FALSE
    const category = await Category.findByIdAndUpdate(id, {estado:false}).populate('usuario', ['nombre', 'correo']);
    
    res.json({
        msg:'CATEGORIA BORRADA',
        category
    });
   
}

module.exports = { 
    categoriesGetAll,
    categoriesGet,
    categoriesPost,
    categoriesPut,
    categoriesDelete
}