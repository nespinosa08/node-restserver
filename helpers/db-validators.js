const Role = require('../models/rol');
const Usuario = require('../models/usuario');


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

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
    }