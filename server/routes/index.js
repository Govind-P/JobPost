import express from 'express';
import signUp from '../controller/signUp.js';
import {verifyEmail} from '../controller/verifyEmail.js';
import {verifyMobile} from '../controller/verifyMobile.js';
import {verifyToken} from '../middleware/verificationStep.js';
import { proceedDashboard } from '../controller/proceedDashboard.js';
import { resendEmail } from '../controller/otpResend.js';
import { loginEmail, loginMobile, loginOtpMobile,loginOtpEmail  } from '../controller/login.js';
import { tokenValidation } from '../middleware/tokenValidation.js';
import { userDetails } from '../controller/userDetails.js';
import { Logout } from '../controller/logout.js';
import { getJobs, postJob } from '../controller/postJob.js';

const router=express.Router();

router.post('/signup', signUp);
router.post('/loginEmail', loginEmail);
router.post('/loginOtpEmail', loginOtpEmail);
router.post('/loginMobile', loginMobile);
router.post('/loginOtpMobile', loginOtpMobile);
router.post('/emailVerify',verifyToken, verifyEmail);
router.post('/mobileVerify',verifyToken,verifyMobile);
// router.get('/resendMobile',verifyToken,resendMobile);
router.get('/resendEmail',verifyToken,resendEmail);
// router.get('/resendotp',verifyToken,resendOTP);
router.get('/proceedDashboard',verifyToken,proceedDashboard);
router.get('/userDetails',tokenValidation,userDetails);
router.post('/jobpost',tokenValidation,postJob);
router.get('/getjobs',tokenValidation,getJobs);
router.get('/logout',tokenValidation,Logout);

export default router;