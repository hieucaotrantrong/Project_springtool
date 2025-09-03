import { Router } from 'express';
import authController from '../controllers/authController';
import { auth } from '../types/auth';

const router = Router();

/*----------------------------------
Register Router
-----------------------------------*/
router.post('/signup', (req, res, next) => {
    authController.signup(req, res, next).catch(next);
});

/*----------------------------------
Login Router
-----------------------------------*/
router.post('/login', (req, res, next) => {
    authController.login(req, res, next).catch(next);
});

/*----------------------------------
Profile Routes - Add GET route
-----------------------------------*/
router.get('/profile', auth, (req, res, next) => {
    authController.getProfile(req, res, next).catch(next);
});

router.put('/profile', auth, (req, res, next) => {
    authController.updateProfile(req, res, next).catch(next);
});

router.put('/change-password', auth, (req, res, next) => {
    authController.changePassword(req, res, next).catch(next);
});

export default router;



