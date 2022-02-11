import express from 'express';
import { registerUser } from '../controllers';

export const router = express.Router();

router.post('/register', registerUser);
