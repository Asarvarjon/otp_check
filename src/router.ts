import { Router } from 'express'; 
import UsersRoute from './modules/users/users.route';
import OtpsRoute from './modules/otps/otp.route';
 
const router = Router()
 
const otpsRoute = new OtpsRoute()
const usersRoute = new UsersRoute()


router.use("/", otpsRoute.router)
router.use("/", usersRoute.router)


export default router