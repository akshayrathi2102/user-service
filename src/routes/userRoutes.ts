import express from 'express';
import { registerUser, loginUser, verifyUser, setUserStatus } from '../controllers';

export const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify', verifyUser);
router.post('/setStatus', setUserStatus);
