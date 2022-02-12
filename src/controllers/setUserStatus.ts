import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { logging } from '../config';
import { User } from '../entity';

const NAMESPACE = 'controllers/setUserStatus';

export const setUserStatus = async (req: Request, res: Response) => {
  try {
    const { idUser, status } = req.body;
    const user = await getRepository(User).findOne({ where: { idUser } });
    if (!user) {
      logging.error(NAMESPACE, 'User not found');
      return res.status(404).json({
        status: 404,
        message: 'User not found'
      });
    }
    user.isVerified = status;
    await getRepository(User).save(user);
    logging.info(NAMESPACE, 'User status updated', { user });
    return res.status(200).json({
      status: 200,
      message: 'User status updated'
    });
  } catch (error) {
    logging.error(NAMESPACE, 'Error updating user status', { error });
    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};
