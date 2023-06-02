const { response, request } = require("express")

//ESTE MIDDLEWARE OBLIGA A QUE EL ROL SEA ADMIN_ROLE
const roleValidator = (req = request, res = response, next)=>{
    
    if (!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere validar el rol antes de validar el JWT'
        });
    }
    
    const {rol, nombre} = req.usuario;
    if (rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `el usuario ${nombre}, no es ADMIN_ROL`
        });
    }

    next();   
}

//ESTE MIDDLEWARE PERMITE QUE EL ROL SEA CUALQUIERA DE LOS INDICADOS DENTRO DEL ARREGLO DE ROLES
const hasRole = (...roles)=>{
    return (req, res, next)=>{
        if (!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere validar el rol antes de validar el JWT'
            });
        }
        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El rol ${req.usuario.rol}, no está autorizado para hacer cambios. Los roles autorizados son: ${roles}`
            });
        }
        next();
    }

}

module.exports = {
    roleValidator,
    hasRole
}