import { prop, Ref } from '@typegoose/typegoose';
import { Career } from './careerModel';
import { Course } from './courseModel';

class Period {
  @prop({ required: true })
  periodNumber: number;

  @prop({ ref: () => Career })
  carreraId: Ref<Career>;

  @prop({ ref: () => Course })
  materias: Ref<Course>[];
}

export { Period };
