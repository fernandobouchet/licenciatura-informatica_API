import express from 'express';
import {
  getUserInfo,
  addUserCourse,
  updateUserCourse,
  deleteUserCourse,
} from '../controllers';

const router = express.Router();

router.get('/', getUserInfo);

router.post('/course', addUserCourse);

router.put('/course', updateUserCourse);

router.delete('/course', deleteUserCourse);

export { router as userRoutes };
