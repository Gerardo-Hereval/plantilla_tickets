const express = require('express')

const cors = require('cors');
const { socketController } = require('../sockets/controller');




//crear en server la aplicacion de express
class Server {

    constructor(){
        this.app        = express();
        this.port       =process.env.PORT;
        this.server     = require('http').createServer(this.app); //este es el server que se va a levantar
        this.io         = require('socket.io')(this.server); //conexion a todas los clientes conectados


        this.paths ={ }
        
        //middlewares son funciones que se ejecutaran en cuando carguemos
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();

        //Manejo de eventos sockets

        this.sockets();
    };


    middlewares(){

        //CORS
        this.app.use(cors());


        //directorio publico
        this.app.use(express.static('public'));

        //manejo de carga de archivos

    }

    routes(){        
    //this.app.use(this.paths.auth,       require('../routes/auth'));
    };

    sockets(){
        this.io.on('connection', socketController);
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    };

};


module.exports=Server