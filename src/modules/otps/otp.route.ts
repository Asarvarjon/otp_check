import { RequestOtpDTO } from './dto/otps.dto';
import { Router } from 'express';
import { Routes } from '../shared/interface/routes.interface';
import validate from '../shared/middlewares/validate';  
import OtpsController from './otps.controller';

export default class OtpsRoute implements Routes {
  public path = '/otps/';
  public router = Router();
  public otpsController = new OtpsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}request`, this.otpsController.requestOtp); 
  }
}
