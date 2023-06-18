const jwt = require('jsonwebtoken');

const jwtGenerator = (uid='')=>{
    return new Promise((resolve, reject)=>{
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:'30m'
        }, (err, token)=>{
            if (err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    })
}

module.exports = {
jwtGenerator
}