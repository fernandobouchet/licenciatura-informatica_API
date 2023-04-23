import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Career } from './careerModel';
import { Course } from './courseModel';

class Period {
  @prop({ required: true })
  periodNumber: number;

  @prop({ required: true, ref: () => Career })
  careerId: Ref<Career>;

  @prop({ ref: () => Course })
  courses: Ref<Course>[];
}

const Periods = getModelForClass(Period);

export { Period, Periods };
