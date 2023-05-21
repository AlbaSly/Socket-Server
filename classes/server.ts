import express, { Application } from "express"
import cors from "cors";
import bodyParser from "body-parser";
import { SERVER_HOST, SERVER_PORT } from "../global/environment";
import router from "../routes/router";

/**
 * Clase servidor para la ejecución del servidor express
 */
export default class Server {
    public app: Application;
    public port: number;
    public host: string;

    public constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.host = SERVER_HOST;
    }

    public start(callback: Function) {
        this.loadMiddlewares();
        this.setCors();
        this.loadRoutes();

        this.app.listen(this.port, this.host, <any>callback);
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
        this.app.use(cors({
            origin: true,
            credentials: true,
        }));
    }
}