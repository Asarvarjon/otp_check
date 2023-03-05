import cron  from 'node-cron';
import cors from "cors";
import express, { Express, Router } from 'express';
import errorHandler from "./modules/shared/middlewares/errorHandler";
import morgan from 'morgan';  
import TasksService from "./modules/otps/tasks/tasks";

class App {
  public app: Express; 
  private taskService = new TasksService()

  constructor(router: Router) {
    this.app = express();

    this.initializeMiddlewares(); 
    this.initializeRoutes(router);
    this.initializeErrorHandling();

    cron.schedule('* * * * *', async () => {
      try {
        await this.taskService.taskForCron();
        
      } catch (error) {
        console.error('Error deactivating expired OTP codes:', error);
      }
    });
  }

  public get getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors({
      origin: "*"
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));  
    this.app.use(morgan("tiny"))

  }
 

  private initializeRoutes(router: Router) {
    this.app.use('/', router);
  }
  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

}

export default App;
