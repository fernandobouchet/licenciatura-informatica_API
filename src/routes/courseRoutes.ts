import express from 'express';
import {
  addCourse,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from '../controllers';

const router = express.Router();

router.get('/', getAllCourses);

router.get('/:id', getCourseById);

router.post('/', addCourse);

router.put('/:id', updateCourseById);

router.delete('/:id', deleteCourseById);

export { router as courseRoutes };
