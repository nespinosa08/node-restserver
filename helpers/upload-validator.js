const path = require('path'); // permite construir el path - viene de NODE
const { v4: uuidv4 } = require('uuid'); // crea un idemtificador unico para el nombre del archivo




const uploadValidator = (files, validExtensions = ['jpg', 'jpeg', 'gif', 'pdf', 'txt'], carpeta ='')=>{
   
    return new Promise((resolve, reject)=>{
        
        const {archivo} = files;
        // obtener extesion del archivo
        const cutName = archivo.name.split('.');
        const ext=cutName[cutName.length -1];
       
        if(!validExtensions.includes(ext)){
            return reject(`la extension ${ext}, no es valida. Las extensiones válidas son: ${validExtensions}`)
        }

        //se debe crear unnombre unico para el archivo (usando uuid)
        const tempName = `${uuidv4()}.${ext}`
    
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, tempName);
      
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err)=> {
          if (err){
              reject(err)
          }
          resolve(tempName);
        });
    })
}

module.exports = {
    uploadValidator
}
