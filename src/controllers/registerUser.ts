import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../entity';
import { getConnection } from 'typeorm';
import { logging } from '../config';

const NAMESPACE = 'controllers/registerUser';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 2);

    const user = new User();
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.password = hashedPassword;
    if (req.body.role) {
      user.role = req.body.role;
    }

    const savedUser = await getConnection().manager.save(user);
    logging.info(NAMESPACE, 'User registered', { user: savedUser });
    res.status(200).json({
      status: 200,
      savedUser
    });
  } catch (error) {
    logging.error(NAMESPACE, 'Error registering user', { error });
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};
