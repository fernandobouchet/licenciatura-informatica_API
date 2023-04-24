import express from 'express';
import {
  addPeriod,
  deletePeriodById,
  getAllPeriods,
  getPeriodById,
  updatePeriodById,
} from '../controllers';

const router = express.Router();

router.get('/', getAllPeriods);

router.get('/:id', getPeriodById);

router.post('/', addPeriod);

router.put('/:id', updatePeriodById);

router.delete('/:id', deletePeriodById);

export { router as periodRoutes };
