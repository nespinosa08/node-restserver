const {response} = require('express');


const { Product } = require('../models');


const productsGetAll = async (req, res=response)=>{
    const  query = req.query;
    const { limite=5, desde=0 }=query;
    const state = {estado:true};

    const [total, products] = await Promise.all([
        Product.countDocuments(state),
        Product.find(state)
            .populate('usuario', ['correo', 'nombre'])
            .populate('category', ['nombre'])
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
    msg:'TODOS LOS PRODUCTOS',
    total,
    products
    });
}

const productsGetById = async (req, res=response)=>{
    const {id}= req.params;
 
    const product = await Product.findById(id)
                        .populate('usuario', ['nombre', 'correo'])
                        .populate('category', ['nombre']);
    res.json({
        msg:'PRODUCTO POR ID',
        product
    });
}



const productsPost = async(req, res=response)=>{    
    const {estado, usuario, ...resto} = req.body;
    // const nombre = resto.nombre

    const productDB = await Product.findOne({nombre:resto.nombre});
    if (productDB){
        return res.status(400).json({
            msg: `El producto ${productDB.nombre} ya existe en la base de datos`
        })
    };

    // Preparar la data a guardar (nombre y usuario que esta creandola categoria)
    const data = {
        ...resto,
        nombre: resto.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    // crear la categoria
    const product = new Product(data);
     
    // guardar la categoria
    await product.save();

    res.status(201).json({
        msg:'PRODUCTO CREADO',
        product
    });
}

const productsPut = async(req, res=response)=>{
    const {id}= req.params;
    // EXTRAER LAS PROPIEDADES DEL REQ QUE NO SE QUIEREN ACTUALIZAR
    const { _id, estado, usuario, ...resto} = req.body;
    
    if (resto.nombre){
        resto.nombre = resto.nombre.toUpperCase();
    }
    // resto.usuario = req.usuario._id;
 
    const product = await Product.findByIdAndUpdate(id, resto, {new:true})
                    .populate('usuario', ['nombre', 'correo'])
                    .populate('category', ['nombre']);
    res.json({
        msg:'PRODUCTO ACTUALIZADO',
        product,
    });
}

const productsDelete = async(req, res=response)=>{
    const {id}= req.params;
    // BORRA EL REGISTRO DE FORMA PERMANENTE
    // const usuario = await Usuario.findByIdAndDelete(id);

    // NO BORRA EL REGISTRO PERMANENTEMENTE. SOLO LE CAMBIA EL ESTADO A FALSE
    const product = await Product.findByIdAndUpdate(id, {estado:false}, {new:true})
                    .populate('usuario', ['nombre', 'correo'])
                    .populate('category', ['nombre']);
    
    res.json({
        msg:'PRODUCTO BORRADO',
        product
    });
   
}

module.exports = { 
    productsGetAll,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete
}