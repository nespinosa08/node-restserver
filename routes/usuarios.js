const {Router} = require('express');
const { usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosPatch, 
    usuariosDelete } = require('../controllers/usuarios');

const router = Router();

// LAS RUTAS SE PONEN POR DEFECTO EN '/' 

router.get('/', usuariosGet)

router.post('/', usuariosPost)
    
router.put('/:n/:id', usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/', usuariosDelete)


    



module.exports = router;