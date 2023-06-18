const {Schema, model}=require('mongoose');

const CategorySchema= Schema({
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
    }
});

CategorySchema.methods.toJSON = function (){
    const {__v, estado, ...resto} = this.toObject();
    return resto;
}


module.exports = model('Category', CategorySchema)