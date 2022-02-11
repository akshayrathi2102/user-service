import express from 'express';
import { router as userRouter } from './userRoutes';

export const router = express.Router();

router.use('/user', userRouter);
