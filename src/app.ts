import config from './utils/environment'
import express, { Application, Request, Response } from 'express';
import http from 'http'


import router from './routers'
import logger from './utils/logger';
import bodyParser from 'body-parser';
import { AppDataSource } from './db';
import { Server } from "socket.io";

class App {

  private app: Application;
  private port: number
  private server: http.Server

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(appInit: { port: number, middlewares: any }) {
    this.app = express();
    this.server = http.createServer(this.app)
    this.sockerIO()
    this.port = appInit.port;
    this.middleware(appInit.middlewares)
    this.routes(this.app)
    this.db()
      .then(() => {
        logger.info('Data Source has been initialized!');
      })
      .catch((error) => {
        logger.error('Error during initialization', {}, error);
        throw error;
      });
  }

  sockerIO() {
    const io = new Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
    
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
    
    this.app.use((req: Request, res: Response, next) => {
      req.io = io;
      next();
    })
  }

  private async db() {
    return AppDataSource.initialize();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private middleware(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(app: Application) {
    router(app);
  }

  

  public listen() {
    const server = this.server.listen(this.port, () => {
      logger.info(`App has started listening on port: ${this.port}: ${process.env.NODE_ENV}`)
    })

  
    // TODO: read about this.
    server.keepAliveTimeout = (75 * 1000) + 1000;
    server.headersTimeout = (75 * 1000) + 2000;
  }


}

const app: App = new App({
  port: Number(config.PORT) || 9000,
  middlewares: [
    (req, res, next) => {
      // CORS
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Cookie, Authorization, x-version-name, x-device-os, source-platform');
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

      // Pass to next layer of middleware
      next();
    },
    bodyParser.json({
      limit: '1mb',
    }),
    bodyParser.urlencoded({ extended: true })
  ]
})

app.listen();
