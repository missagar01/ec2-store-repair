import { Router } from 'express';
import { login, getHODInfo } from '../controllers/auth.controller.js';

const router = Router();

/**
 * @route   POST /auth/login
 * @desc    Authenticate user and return JWT
 * @access  Public
 */
router.post('/login', login);
router.get('/hod/:department', getHODInfo);

export default router;









