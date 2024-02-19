import express from 'express';
const router = express.Router();

/** importing all the controllers */
import * as controllers from '../controllers/appController.js';
import Auth ,{localVariables} from '../middleware/auth.js'
import { registerMail } from '../controllers/mailer.js';

/*Post method*/
router.post('/register',controllers.register) //register the user
router.post('/registerMail',registerMail) //register the user with email
router.post('/authenticate',controllers.verifyUser,(req,res)=>res.end()) //authenticate the user
router.use('/verifyUser',controllers.verifyUser) //verify the user
router.post('/login',controllers.verifyUser,controllers.login) //login the user
// routef.route('/login').post(controllers.verifyUser,controllers.login)


/*Get method*/
router.get('/user/:username',controllers.getUser) // user with username
router.get('/generateOTP',controllers.verifyUser,localVariables,controllers.generateOTP) //generate random OTP
router.get('/verifyOTP',controllers.verifyUser,controllers.verifyOTP) //verify generated OTP
router.get('/createResetSession',controllers.createResetSession) //reset all the variables
// router.get('/gettokenuser',controllers.getUserFromToken)

/*Put method*/
router.put('/updateuser',Auth,controllers.updateUser) //to update the user profile

router.put('/resetPassword',controllers.verifyUser,controllers.resetPassword) //use to reset the password



export default router;