import express from 'express';
import {
  addCareer,
  deleteCareerById,
  getAllCareers,
  getCareerPeriodsById,
  updateCareerById,
} from '../controllers';

const router = express.Router();

router.get('/', getAllCareers);

router.get('/:id', getCareerPeriodsById);

router.post('/', addCareer);

router.put('/:id', updateCareerById);

router.delete('/:id', deleteCareerById);

export { router as careerRoutes };
