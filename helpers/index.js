const dbvalidators = require ( './db-validators' );
const dbJwtGenerator = require ( './jwt-generator' );
const dbUploadValidator = require ( './upload-validator' );
//... permite obtener constantes y otras funcionalidades en donde se importe la función
module.exports = {
    ...dbvalidators,
    ...dbJwtGenerator,
    ...dbUploadValidator

}