import http from "http";
import express, { Application, Request, Response, NextFunction } from "express"
import cors from "cors";
import bodyParser from "body-parser";

import socketIO from "socket.io";

import { SERVER_HOST, SERVER_PORT } from "../global/environment";
import router from "../routes/router";
import { setUser, desconectar, mensaje, conectarCliente } from "../sockets";

/**
 * Clase servidor para la ejecución del servidor express
 */
export default class Server {

    private static _instance: Server;

    public app: Application;
    public port: number;
    public host: string;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.host = SERVER_HOST;

        this.httpServer = new http.Server(this.app)
        this.io = new socketIO.Server(this.httpServer, {
            cors: {
                origin: true,
                credentials: true,
                allowedHeaders: ['Access-Control-Allow-Origin']
            }
        });
    }

    /**Implementación de Singleton */
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private listenSockets() {
        console.log('Escuchando conexiones - Sockets');

        this.io.on('connection', client => {
            /**Aquí se mandan todos los eventos que harán los sockets */

            /**Conectar el cliente */
            conectarCliente(client);
            /**Detectar y configurar usuario */
            setUser(client, this.io);
            /**Desconectar */
            desconectar(client);
            /**Detectar y emitir mensajes */
            mensaje(client, this.io);
        });
    }

    public start(callback: Function) {
        this.loadMiddlewares();
        this.setCors();
        this.loadRoutes();

        /**Reemplazo de app por httpServer */
        this.httpServer.listen(this.port, this.host, <any>callback);

        /**Siempre la inicialización de los sockets después de levantar la aplicación de Express */
        this.listenSockets();
    }

    public loadRoutes(): void {
        this.app.use('/', router);

        console.log('Rutas cargadas');
    }

    public loadMiddlewares(): void {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());

        console.log('Middlewares configurados');
    }

    public setCors(): void {
        this.app.use('*', (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
            res.header("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
            next();
        });
        this.app.use(cors({
            origin: true,
            credentials: true,
        }));
        console.log('CORS Configurados');
    }
}