

const { validarCampos } = require('../middlewares/validar-campos');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { roleValidator, hasRole } = require('../middlewares/role-validator');
const { uploadFileValidator } = require('../middlewares/uploadFile-validator');

module.exports = {
    validarCampos,
    jwtValidator,
    roleValidator,
    hasRole,
    uploadFileValidator
}