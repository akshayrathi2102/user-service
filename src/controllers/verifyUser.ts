import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { config, logging } from '../config';
import { User } from '../entity';

const NAMESPACE = 'controllers/verifyUser';

export const verifyUser = async (req: Request, res: Response) => {
  const token = req.body.jwt;
  if (!token) {
    logging.error(NAMESPACE, 'No token provided');
    return res.status(401).json({
      status: 401,
      message: 'No token provided'
    });
  }
  try {
    const decoded = await jwt.verify(token, config.auth.accessTokenSecret);
    const user = await getRepository(User).findOne({ where: { idUser: (decoded as JwtPayload).id } });
    if (!user) {
      logging.error(NAMESPACE, 'User not found');
      return res.status(401).json({
        status: 401,
        message: 'User not found'
      });
    }
    if (user.isVerified === 0) {
      logging.error(NAMESPACE, 'User not verified by admin');
      return res.status(401).json({
        status: 401,
        message: 'User not verified by admin'
      });
    }
    if (user.isVerified === 2) {
      logging.error(NAMESPACE, 'User is blocked');
      return res.status(401).json({
        status: 401,
        message: 'User is blocked'
      });
    }
    logging.info(NAMESPACE, 'User verified', { user });
    return res.status(200).json({
      status: 200,
      user: {
        idUser: user.idUser,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    logging.error(NAMESPACE, 'Error verifying user', { error });
    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};
