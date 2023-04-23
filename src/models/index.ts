import { getModelForClass } from '@typegoose/typegoose';
import { Career } from './careerModel';
import { User } from './userModel';

const userModel = getModelForClass(User);
const careerModel = getModelForClass(Career);

export { userModel, careerModel };
