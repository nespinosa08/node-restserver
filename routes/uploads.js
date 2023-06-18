const {Router} = require('express');
const { check } = require('express-validator');

const { uploadFile, imgUpdate, imgShow, imgUpdateCloudinary } = require('../controllers/uploads');

const { isAllowedCollection } = require('../helpers');

const { validarCampos, uploadFileValidator } = require('../middlewares');


const router = Router();

router.post('/', [
    uploadFileValidator
], uploadFile) // Para subir archivos al servidor

/* router.put('/:collection/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('collection').custom(collection =>isAllowedCollection(collection, ['usuarios', 'products'])),
    uploadFileValidator,
    validarCampos
], imgUpdate) */ // Para actualizar imagenes de usuarios y productos en el directorio raiz

router.put('/:collection/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('collection').custom(collection =>isAllowedCollection(collection, ['usuarios', 'products'])),
    uploadFileValidator,
    validarCampos
], imgUpdateCloudinary) // Para actualizar imagenes de usuarios y productos en cloudinary

router.get('/:collection/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('collection').custom(collection =>isAllowedCollection(collection, ['usuarios', 'products'])),
    validarCampos
], imgShow) // Para obtener imagenes de usuarios y productos en la pagina

module.exports=router;
