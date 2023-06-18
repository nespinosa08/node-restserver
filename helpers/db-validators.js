const { Usuario, Category, Product } = require('../models');
const Role = require('../models/rol');
const {isValidObjectId} =require('mongoose');
// const Usuario = require('../models/usuario');


const esRoleValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const emailExiste = async(correo='')=>{

    const exiteEmail = await Usuario.findOne({correo});
    if (exiteEmail){
        throw new Error(`El correo ${correo} ya esta registrado en nuestra base de datos`)
    }
}

const existeUsuarioPorId = async (id)=>{
    // VERIFICA SI EL ID EXISTE
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(`El id ${id} no existe`);
    }
}

const existsCategoryById = async (id)=>{
    // VERIFICA SI EL ID EXISTE
    
    const existsCategory = await Category.findById(id);
    if (!existsCategory){
        throw new Error(`El id ${id} no existe como categoria`);
    }
}

const existsProductById = async (id)=>{
    // VERIFICA SI EL ID EXISTE
    
    const existsProduct = await Product.findById(id);
    if (!existsProduct){
        throw new Error(`El id ${id} no existe`);
    }
}

//EL VALIDATOR SOLO DEBE RECIBIR 1 PARAMETRO (EL PARAMETRO QUE SE ESTA VALIDANDO)
const isAllowedCollection = (collection, allowedCollections)=>{
    if ( !allowedCollections.includes(collection)){
        throw new Error(`La colleción ${collection} no existe. Las colecciones validas son: ${allowedCollections}`)
    }
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existsCategoryById,
    existsProductById,
    isAllowedCollection
    }