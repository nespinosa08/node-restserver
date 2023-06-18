const {Router} = require('express');
const { check } = require('express-validator');


const { categoriesPost, categoriesGetAll, categoriesPut, categoriesDelete, categoriesGet } = require('../controllers/categories');
const { validarCampos, jwtValidator, hasRole } = require('../middlewares');

const { esRoleValido, existsCategoryById } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias - Publico - Debe ser, Paginado - Total - Populate(mongoose)
router.get('/', categoriesGetAll)

// Obtener una categoria por id - Publico
router.get('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existsCategoryById),
    validarCampos
], categoriesGet)

// Crear una categoria - Privado -  persona autorizada con un token
router.post('/', [
    jwtValidator,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriesPost)

// Actualizar una categorias por id - Privado -  persona autorizada con un token
router.put('/:id', [
    jwtValidator,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existsCategoryById),
    validarCampos
], categoriesPut)

// Eliminar (cambiar el estado de true a false) una categorias por id - ADMIN
router.delete('/:id', [
    jwtValidator,
    hasRole('ADMIN_ROL'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existsCategoryById),
    validarCampos
], categoriesDelete)


module.exports=router;
