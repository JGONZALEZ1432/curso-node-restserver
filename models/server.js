const express = require('express')
var cors = require('cors')
const { dbconnection } = require('../database/config')

class Server{


    constructor(){
        this.app  = express ();
    
        this.port = process.env.PORT;
      
        this.usuariosPath='/api/users'
        this.authPath = '/api/auth'
        this.conectarDB();

        //Middlewars
        this.middlewares()
        //Rutas de mi aplicación
        this.routes();
      

    }
    async conectarDB(){
        await dbconnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json())
        //DIRECOTORIO PUBLICO
        this.app.use( express.static('public'));   
    }

    routes(){
     this.app.use(this.authPath, require('../routes/auth'));
     this.app.use(this.usuariosPath, require('../routes/user'));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;