import { Request, Response } from 'express';
import { Courses } from '../models';

const getAllCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await Courses.find().populate('correlatives');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).send({ message: 'Error getting all courses' });
  }
};

const getCourseById = async (req: Request, res: Response) => {
  try {
    const receivedId = req.params.id;
    const course = await Courses.findById(receivedId).populate('correlatives');
    res.status(200).json(course);
  } catch (error) {
    res.status(500).send({ message: 'Error getting course' });
  }
};

const addCourse = async (req: Request, res: Response) => {
  try {
    const {
      name,
      courseNumber,
      area,
      hsWeekly,
      hsTotal,
      hasCorrelatives,
      correlatives,
      hasOptatives,
      optatives,
      hasEquivalents,
      equivalents,
    } = req.body;
    const course = await Courses.create({
      name: name,
      courseNumber: courseNumber,
      area: area,
      hsWeekly: hsWeekly,
      hsTotal: hsTotal,
      hasCorrelatives: hasCorrelatives,
      correlatives: correlatives,
      hasOptatives: hasOptatives,
      optatives: optatives,
      hasEquivalents: hasEquivalents,
      equivalents: equivalents,
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).send({ message: 'Error adding course' });
  }
};

const updateCourseById = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const courseUpdated = req.body;
    const updatedCourse = await Courses.findByIdAndUpdate(
      courseId,
      courseUpdated,
      { new: true }
    );
    if (!updatedCourse) {
      res.status(404).send({ message: 'Course doesnt exists' });
    } else {
      res.status(200).send(updatedCourse);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating course' });
  }
};

const deleteCourseById = async (req: Request, res: Response) => {
  try {
    const receivedId = req.params.id;
    const course = await Courses.findById(receivedId);
    if (!course) {
      res.status(404).json({ error: 'Course doesnt exists' });
    } else {
      await course.deleteOne();
      res.status(200).json({ id: receivedId });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting course' });
  }
};

export {
  getAllCourses,
  addCourse,
  updateCourseById,
  deleteCourseById,
  getCourseById,
};
