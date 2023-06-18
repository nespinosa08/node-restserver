const {Schema, model}=require('mongoose');

const ProductSchema= Schema({
    nombre: {
        type:String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type:Boolean,
        required: true,
        default: true
    },
    // Usuario que crea la categoria
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio:{
        type:Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
    },
    img:{
        type: String
    }
});

ProductSchema.methods.toJSON = function (){
    const {__v, estado, ...resto} = this.toObject();
    return resto;
}


module.exports = model('Product', ProductSchema)