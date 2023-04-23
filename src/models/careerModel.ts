import { getModelForClass, prop } from '@typegoose/typegoose';

class Career {
  @prop({ required: true, unique: true })
  careerNumber: number;

  @prop({ required: true, unique: true })
  name: string;
}

const Careers = getModelForClass(Career);

export { Career, Careers };
