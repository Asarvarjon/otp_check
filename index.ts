import * as dotenv from 'dotenv' 
dotenv.config()

import http from 'http';
import App from "./src/server";
import router from "./src/router";

import {serverConfig}  from './src/config/conf';


const ExpressApp = new App(router)

const server = http.createServer(ExpressApp.getServer);

// _________LISTEN PORT___________
const port = process.env.PORT 

server.listen(port, () => console.log("Listening port on " + serverConfig.port))