import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { config } from '../config';
import { User } from '../entity';
import { logging } from '../config';

const NAMESPACE = 'controllers/loginUser';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getRepository(User).findOne({ where: { email } });
    if (!user) {
      logging.error(NAMESPACE, 'User not found');
      return res.status(401).json({
        status: 401,
        message: 'User not found'
      });
    }
    const isValidPassword = await bcrypt.compare(password, user!.password);
    if (!isValidPassword) {
      logging.error(NAMESPACE, 'Invalid password');
      return res.status(401).json({
        status: 401,
        message: 'Invalid password'
      });
    }
    if (user!.isVerified === 0) {
      logging.error(NAMESPACE, 'User not verified by admin');
      return res.status(401).json({
        status: 401,
        message: 'User not verified by admin'
      });
    }
    if (user!.isVerified === 2) {
      logging.error(NAMESPACE, 'User is blocked');
      return res.status(401).json({
        status: 401,
        message: 'User is blocked'
      });
    }
    const token = jwt.sign({ id: user!.idUser }, config.auth.accessTokenSecret, { expiresIn: '1h' });
    logging.info(NAMESPACE, 'User logged in', { user });
    res.status(200).json({
      status: 200,
      token,
      user: {
        idUser: user.idUser,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    logging.error(NAMESPACE, 'Error logging in user', { error });
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};
