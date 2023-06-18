const express = require('express');
const cors = require('cors');
const fileUpload = require ( 'express-fileupload')

const { dbconection } = require('../database/config');


class Server{



    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            searchs: '/api/searchs',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
        };

        // LLAMAR BASE DE DATOS
        this.conectarDB();

        // MIDDLEWARES
        this.middlewares();

        // RUTAS
        this.routes();
    }

    async conectarDB(){
        await dbconection();
    }

    middlewares(){
        
        // PARA RESTRINGIR LAS PAGINAS CON CORS
        this.app.use(cors());

        // PARA A LECTURA Y PARSEO DEL BODY DEL REQ
        this.app.use(express.json());

        // PARA USAR CARPETA PUBLIC
        this.app.use(express.static('public'));

        // PARA SUBIR ARCHIVOS CON UPLOAD
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes(){
        // SE DEBE DEFINIR EL PATH PARA LLAMAR LAS ROUTES
       this.app.use(this.paths.auth, require('../routes/auth'))
       this.app.use(this.paths.categories, require('../routes/categories'))
       this.app.use(this.paths.products, require('../routes/products'))
       this.app.use(this.paths.searchs, require('../routes/searchs'))
       this.app.use(this.paths.uploads, require('../routes/uploads'))
       this.app.use(this.paths.usuarios, require('../routes/usuarios'))
        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;