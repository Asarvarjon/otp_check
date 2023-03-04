import { Router, Request } from 'express'; 

export interface Routes {
  path?: string;
  router: Router;
}
 