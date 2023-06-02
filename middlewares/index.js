

const { validarCampos } = require('../middlewares/validar-campos');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { roleValidator, hasRole } = require('../middlewares/role-validator');

module.exports = {
    validarCampos,
    jwtValidator,
    roleValidator,
    hasRole
}