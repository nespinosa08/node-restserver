// CRUD tipos de solicitud (Zona social, BarbQ, Cancha)
// crear solicitud (POST)       => Residente
// leer solicitud (GET)         => Residente
// modificar solicitud (PUT)    => Residente
// eliminar solicitud (DEL)     => Residente

// CRUD tipos de notificaciones (Recibo de gas, Recibo de acueducto, Recibo de electricidad, Recibo de paquetes, Recibo de domicilio)
// crear notificacion (POST)    => Administrador
// leer notificacion (GET)      => Admnistrador
// modificar notificacion (PUT) => Administrador
// eliminar notificación (DEL)  => Administrador 


// const requestType = {

// }

// router.post('/',[
//     check('requestType').custom(isRequestTypeValid),
//     check('date', 'No es una fecha valida').isTime(),
//     check('date').custom(isAvailable),
//     validarCampos
// ], requestsPost)

// router.put('/:id', [
//     check('id', 'No es un Id válido').isMongoId(),
//     check('id').custom(existRequestById),
//     check('date').custom(isAvailable),
//     validarCampos
// ], requestsPut)

// router.delete('/:id', [
//     jwtValidator,
//     // roleValidator,
//     hasRole('SUPER_ADMIN', 'ADMIN', 'USER'),
//     check('id', 'No es un Id válido').isMongoId(),
//     check('id').custom(existRequestById),
//     validarCampos
// ], requestsDelete)




// const roles = [
//     {
//         _id: '',
//         rol: 'SUPER_ADMIN'
//     },
//     {
//         _id: '',
//         rol: 'ADMIN'
//     },
//     {
//         _id: '',
//         rol: 'USER'
//     },
//     'Hasta n roles'
// ]



// const clients = [
//     {
//         id: '001',
//         name: 'urb. Camino Real',
//         address: {
//             country: '',
//             city: '',
//             zipCode: ''
//         },
//         email: '',
//         phone: '',
//         contract: {
//             numberContrac: 001,
//             createdAt:'',
//             expiredAt:'',
//             filePdf:''
//         }
//     },
// 'Hasta n clients'
// ]


// const dataBase = {

//     clients: [ 
//         {
//             id: '001',
//             name: 'urb. Camino Real',
//             address: {
//                 country: '',
//                 city: '',
//                 zipCode: ''
//             },
//             email: '',
//             phone: '',
//             contract: {
//                 numberContrac: 001,
//                 createdAt:'',
//                 expiredAt:'',
//                 filePdf:''
//             }
//         },
//     'Hasta n client'
//     ],

// }


