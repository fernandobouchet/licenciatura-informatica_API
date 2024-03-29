import { Request, Response } from 'express';
import { Careers, Periods } from '../models';

const getAllCareers = async (_req: Request, res: Response) => {
  try {
    const careers = await Careers.find();
    res.status(200).send(careers);
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.log(error);
    res.status(500).send({ message: message });
  }
};

const getCareerPeriodsById = async (req: Request, res: Response) => {
  try {
    const receivedId = req.params.id;
    const periods = await Periods.find({ careerId: receivedId }).populate(
      'courses'
    );
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

const addCareer = async (req: Request, res: Response) => {
  try {
    const { name, careerNumber } = req.body;
    const career = await Careers.create({
      name: name,
      careerNumber: careerNumber,
    });
    res.status(200).json(career);
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = `Error: ${error.message}`;
    }
    console.log(error);
    res.status(500).send({ message: message });
  }
};

const updateCareerById = async (req: Request, res: Response) => {
  try {
    const careerId = req.params.id;
    const careerUpdated = req.body;
    const updatedCareer = await Periods.findByIdAndUpdate(
      careerId,
      careerUpdated,
      { new: true }
    );

    if (!updatedCareer) {
      res.status(404).send({ message: 'Career doesnt exists' });
    } else {
      res.status(200).send(updatedCareer);
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

const deleteCareerById = async (req: Request, res: Response) => {
  try {
    const receivedId = req.params.id;
    const career = await Careers.findById(receivedId);
    if (!career) {
      res.status(404).json({ error: 'Career doesnt exists' });
    } else {
      await career.deleteOne();
      res.status(200).json({ id: receivedId });
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
  getAllCareers,
  addCareer,
  deleteCareerById,
  updateCareerById,
  getCareerPeriodsById,
};
