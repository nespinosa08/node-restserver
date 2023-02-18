const mongoose = require('mongoose');

const dbconection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {
            // useNewUrlParser     :true,
            // useUnifiedTopology  :true,
            // useCreateIndex      :true,
            // useFindAndModify    :false
        })
        console.log('Base de datos online')
    }catch (err){
        console.log(err); // ERROR DETECTADO POR CONSOLA
        throw new Error('Error al iniciar la base de datos'); //ERROR COTROLADO Y PERSONALIZADO
    }
}

module.exports={
    dbconection
}