const express = require('express')
var cors = require('cors')

class Server{


    constructor(){
        this.app  = express ();
    
        this.port = process.env.PORT;
        this.usuariosPath='/api/users'
     

        //Middlewars
        this.middlewares()
        //Rutas de mi aplicación
        this.routes();
      

    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json())
        //DIRECOTORIO PUBLICO
     this.app.use( express.static(__dirname + '/public'));   
    }

    routes(){
     this.app.use(this.usuariosPath, require('../routes/user'));
    }
    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;