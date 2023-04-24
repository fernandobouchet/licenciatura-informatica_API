import { Request, Response } from 'express';
import { Periods } from '../models';

const getAllPeriods = async (_req: Request, res: Response) => {
  try {
    const periods = await Periods.find();
    res.status(200).json(periods);
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.log(error);
    res.status(500).send({ message: message });
  }
};

const getPeriodById = async (req: Request, res: Response) => {
  try {
    const periods = await Periods.findById(req.params.id).populate('courses');
    res.status(200).json(periods);
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.log(error);
    res.status(500).send({ message: message });
  }
};

const addPeriod = async (req: Request, res: Response) => {
  try {
    const period = await Periods.create({
      periodNumber: req.body.periodNumber,
      careerId: req.body.careerId,
      courses: req.body.courses,
    });
    res.status(200).json(period);
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.log(error);
    res.status(500).send({ message: message });
  }
};

const updatePeriodById = async (req: Request, res: Response) => {
  try {
    const periodId = req.params.id;
    const periodUpdated = req.body;

    const updatedPeriod = await Periods.findByIdAndUpdate(
      periodId,
      periodUpdated,
      { new: true }
    );

    if (!updatedPeriod) {
      res.status(404).send({ message: 'Period doesnt exists' });
    } else {
      res.status(200).send(updatedPeriod);
    }
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.log(error);
    res.status(500).send({ message: message });
  }
};

const deletePeriodById = async (req: Request, res: Response) => {
  try {
    const period = await Periods.findById(req.params.id);

    if (!period) {
      res.status(404).json({ error: 'Period doesnt exists' });
    } else {
      await period.deleteOne();
      res.status(200).json({ id: req.params.id });
    }
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.log(error);
    res.status(500).send({ message: message });
  }
};

export {
  getAllPeriods,
  addPeriod,
  deletePeriodById,
  updatePeriodById,
  getPeriodById,
};
