const { response } = require("express");

const uploadFileValidator = (req, res=response, next)=>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send('No hay archivos para subir. -Middleware');
      };

    next();
}

module.exports = {
    uploadFileValidator
}
