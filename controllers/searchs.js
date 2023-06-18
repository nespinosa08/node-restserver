const { response } = require("express");
const { Usuario, Category, Product } = require("../models");
const { ObjectId } = require("mongoose").Types;


const possibleCollection = ['usuarios', 'categories', 'products'];



const searchUser = async(term, res=response)=>{

    const isMongoId = ObjectId.isValid(term);
   
    if (isMongoId){
      const usuario = await Usuario.findById(term);
      return res.status(200).json({
        result: (usuario)? [usuario]: []
      });
    }
      
    const regexp = new RegExp(term, 'i')
    const usuario = await Usuario.find({
        $or: [{nombre:regexp}, {correo:regexp}],
        $and: [{estado:true}]
    });
    //find() retorna un arreglo de objetos, por lo que no es necesario indicar el arreglo en la respuesta

    const total = await Usuario.countDocuments({
        $or: [{nombre:regexp}, {correo:regexp}],
        $and: [{estado:true}]
    });

    res.status(200).json({
        total,
        result: usuario
    })
}

const searchCategory = async(term, res=response)=>{
    const isMongoId = ObjectId.isValid(term);
   
    if (isMongoId){
      const category = await Category.findById(term);
      return res.status(200).json({
        result: (category)? [category]: []
      });
    }
      
    const regexp = new RegExp(term, 'i')
    const category = await Category.find({
        $or: [{nombre:regexp}],
        $and: [{estado:true}]
    });
    //find() retorna un arreglo de objetos, por lo que no es necesario indicar el arreglo en la respuesta

    const total = await Category.countDocuments({
        $or: [{nombre:regexp}],
        $and: [{estado:true}]
    });

    res.status(200).json({
        total,
        result: category
    })
}


const searchProduct = async (term, res)=>{
    const isMongoId = ObjectId.isValid(term);
   
    if (isMongoId){
      const product = await Product.findById(term)
                            .populate('category','nombre')
                            .populate('usuario', 'nombre');
      return res.status(200).json({
        result: (product)? [product]: []
      });
    }
      
    const regexp = new RegExp(term, 'i')
    const product = await Product.find({
        $or: [{nombre:regexp}, {descripcion:regexp}],
        $and: [{estado:true}]
    })
                            .populate('category','nombre')
                            .populate('usuario', 'nombre');
    //find() retorna un arreglo de objetos, por lo que no es necesario indicar el arreglo en la respuesta

    const total = await Product.countDocuments({
        $or: [{nombre:regexp}, {descripcion:regexp}],
        $and: [{estado:true}]
    });

    res.status(200).json({
        total,
        result: product
    })
}



const searchTerm = (req, res=response)=>{
    const {collection, term}= req.params;

    if (!possibleCollection.includes(collection)){
        return res.status(400).json({
            msg: `la coleccion ingresada (${collection}), no está registarada en la BD. Las colecciones permitidas son: (${possibleCollection})`
        })
    }
    
        switch (collection){
            case 'usuarios':
            searchUser(term, res);
            break;

            case 'categories':
            searchCategory(term, res);
            break;

            case 'products':
            searchProduct(term, res);
            break;

            default:
                res.status(500).json({
                    msg: `Admin: falta incluir la busqueda de la coleccion (${collection}) en el servidor`
                })
        }
    


}

module.exports = {
    searchTerm
}