const path = require('path'); // permite construir el path - viene de NODE
const fs = require('node:fs');
// const { v4: uuidv4 } = require('uuid'); // crea un idemtificador unico para el nombre del archivo

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const { response } = require("express");
const { uploadValidator } = require("../helpers");
const { Usuario, Product } = require("../models");


const uploadFile = async (req, res=response)=>{
        // NOTA: Este bloque de codigo se convierte en un middleware, para simplificar el controlador
        // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        //   return res.status(400).send('No hay archivos para subir.');
        // }
        
        // NOTA: Este bloque de codigo se conviert en un helper validator, para simplificar el controlador
        // const {archivo} = req.files;
        // // obtener extesion del archivo
        // const cutName = archivo.name.split('.');
        // console.log(cutName)
        // const ext=cutName[cutName.length -1];
        // console.log(ext)

        // const validExtensions=['jpg', 'jpeg', 'gif', 'pdf', 'txt']
        // if(!validExtensions.includes(ext)){
        //     return res.status(400).json({
        //         msg: `la extension ${ext}, no es valida. Las extensiones válidas son: ${validExtensions}`
        //     })
        // }
        // //se debe crear unnombre unico para el archivo (usando uuid)
        // const tempName = `${uuidv4()}.${ext}`

        // const uploadPath = path.join(__dirname, '../uploads/', tempName);
      
        // // Use the mv() method to place the file somewhere on your server
        // archivo.mv(uploadPath, (err)=> {
        //   if (err){
        //       return res.status(500).json({err});
        //   }
        //   res.json({msg:'File uploaded to ' + uploadPath});
        // });
        try{
            const finalName = await uploadValidator(req.files, undefined, 'img');
    
            res.json({
                finalName
            })

        }catch (msg){
            res.status(400). json({
                msg
            })
        }
}

// const imgUpdate= async(req, res = response)=>{

//     const {collection, id}= req.params;

//     let modelo;

//     switch(collection){
//         case 'usuarios':
//             modelo = await Usuario.findById(id);
//             if(!modelo){
//                 return res.status(400).json({
//                     msg: `No existe el id ${id} en la coleccion: ${collection}`
//                 })
//             }
        
//         break;

//         case 'products':
//             modelo = await Product.findById(id);
//             if(!modelo){
//                 return res.status(400).json({
//                     msg: `No existe el id ${id} en la coleccion: ${collection}`
//                 })
//             }
        
//         break;

//         default:
//             return res.statusCode(500).json({
//                 msg: 'falta incluir la coleccion para actualizar la imagen'
//             })

//     }

//     // Borrar la imagen anterior en el modelo para actualizar con la imagen nueva
//     if (modelo.img){
//         const pathImage = path.join(__dirname, '../uploads', collection, modelo.img);
//         if (fs.existsSync(pathImage)){
//             fs.unlinkSync(pathImage);
//         }
//     }
//    /*  Asigna el nombre del archivo a la propiedad (modelo.img)
//     Esto no es aceptado por los hosting como heroku ya que los hostig borran los archivos cada vez aue se hace un deployment, por lo cual se necesita asignar una direccion http:// de otro hosting como cloudinary. */
//     const finalName = await uploadValidator(req.files, undefined, collection);
//     modelo.img = finalName;
//     await modelo.save();
    
//     res.json({
//         modelo
//     })
// }

const imgUpdateCloudinary= async(req, res = response)=>{

    const {collection, id}= req.params;

    let modelo;

    switch(collection){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe el id ${id} en la coleccion: ${collection}`
                })
            }
        
        break;

        case 'products':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe el id ${id} en la coleccion: ${collection}`
                })
            }
        
        break;

        default:
            return res.statusCode(500).json({
                msg: 'falta incluir la coleccion para actualizar la imagen'
            })

    }

    // Borrar la imagen anterior en el modelo para actualizar con la imagen nueva (en cloudinary)
    if (modelo.img){
        const arrName = modelo.img.split('/');
        const fileName =arrName[arrName.length-1];
        const [public_id] = fileName.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();
    
    res.json({
        modelo
    })
}


const imgShow= async(req, res = response)=>{

    const {collection, id}= req.params;

    let modelo;

    switch(collection){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe el id ${id} en la coleccion: ${collection}`
                })
            }
        
        break;

        case 'products':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe el id ${id} en la coleccion: ${collection}`
                })
            }
        
        break;

        default:
            return res.statusCode(500).json({
                msg: 'falta incluir la coleccion para actualizar la imagen'
            })

    }

    if (modelo.img){
        const pathImage = path.join(__dirname, '../uploads', collection, modelo.img);
        if (fs.existsSync(pathImage)){
            return res.sendFile(pathImage)
        }
    }

    const pathNoImage = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathNoImage);
}

module.exports = {
    imgShow,
    // imgUpdate,
    imgUpdateCloudinary,
    uploadFile
}
