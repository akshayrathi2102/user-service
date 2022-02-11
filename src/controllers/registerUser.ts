import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../entity';
import { getConnection } from 'typeorm';

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
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
