const {Router} = require('express');
const { check } = require('express-validator');



const { validarCampos, jwtValidator, hasRole } = require('../middlewares');

const { esRoleValido, existsProductById, existsCategoryById } = require('../helpers/db-validators');
const { productsGetById, productsGetAll, productsPut, productsDelete, productsPost } = require('../controllers/products');

const router = Router();

// Obtener todas las categorias - Publico - Debe ser, Paginado - Total - Populate(mongoose)
router.get('/', productsGetAll)

// Obtener una categoria por id - Publico
router.get('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existsProductById),
    validarCampos
], productsGetById)

// Crear una categoria - Privado -  persona autorizada con un token
router.post('/', [
    jwtValidator,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('precio', 'El precio es obligatorio').not().isEmpty(),
    // check('category', 'La categoria es obligatoria').not().isEmpty(),
    // check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    // check('disponible', 'La disponibilidad es obligatoria').not().isEmpty(),
    check('category', 'No es un Id válido').isMongoId(),
    check('category').custom(existsCategoryById),   
    validarCampos
], productsPost)

// Actualizar una categorias por id - Privado -  persona autorizada con un token
router.put('/:id', [
    jwtValidator,
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('precio', 'El precio es obligatorio').not().isEmpty(),
    // check('category', 'La categoria es obligatoria').not().isEmpty(),
    // check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    // check('disponible', 'La disponibilidad es obligatoria').not().isEmpty(),
    check('id', 'No es un Id válido').isMongoId(),
    // check('id').custom(existsCategoryById),   
    check('id').custom(existsProductById),
    validarCampos
], productsPut)

// Eliminar (cambiar el estado de true a false) una categorias por id - ADMIN
router.delete('/:id', [
    jwtValidator,
    hasRole('ADMIN_ROL'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existsProductById),
    validarCampos
], productsDelete)


module.exports=router;
