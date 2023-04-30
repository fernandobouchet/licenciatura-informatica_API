import { Request, Response } from 'express';
import { Users } from '../models';
import { UserRequest } from '../interfaces';

const getUserInfo = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const userInfo = req.user;
    res.send(userInfo);
  } else {
    res.send(null);
  }
};

const addUserCourse = async (req: UserRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id, status, qualification } = req.body;
    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId },
      { $push: { courses: { id, status, qualification } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.status(200).json({ id, status, qualification });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.log(error);
    return res.status(500).send({ message: message });
  }
};

const updateUserCourse = async (req: UserRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id, status, qualification } = req.body;

    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId, 'courses.id': id },
      {
        $set: {
          'courses.$.status': status,
          'courses.$.qualification': qualification,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.status(200).json({ id, status, qualification });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.log(error);
    return res.status(500).send({ message: message });
  }
};

const deleteUserCourse = async (req: UserRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id, status, qualification } = req.body;
    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId, 'courses.id': id },
      { $pull: { courses: { id: id } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.status(200).json({ id, status, qualification });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.log(error);
    return res.status(500).send({ message: message });
  }
};

export { getUserInfo, addUserCourse, updateUserCourse, deleteUserCourse };
