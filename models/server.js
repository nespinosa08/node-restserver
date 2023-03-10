const express = require('express');
const cors = require('cors');


class Server{



    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // MIDDLEWARES
        this.middlewares();

        // RUTAS
        this.routes();
    }

    middlewares(){
        
        // PARA RESTRINGIR LAS PAGINAS CON CORS
        this.app.use(cors());

        // PARA A LECTURA Y PARSEO DEL BODY DEL REQ
        this.app.use(express.json());

        // PARA USAR CARPETA PUBLIC
        this.app.use(express.static('public'));
    }

    routes(){
        // SE DEBE DEFINRI EL PATH PARA LLAMAR LAS ROUTES
       this.app.use(this.usuariosPath, require('../routes/usuarios'))
        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;