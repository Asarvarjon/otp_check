import { Router } from 'express'; 
import { Routes } from '../shared/interface/routes.interface';
import validate from '../shared/middlewares/validate';
import UsersController from './users.controller';
import { CreateUserDTO } from './dto/users.dto'; 

export default class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get all
    this.router.get(`${this.path}/`, this.usersController.getAll);
    // Get main parent users 
    // Create new
    this.router.post(`${this.path}/`, this.usersController.create); 
  }
}
