import { prop } from '@typegoose/typegoose';

class Career {
  @prop({ required: true, unique: true })
  careerNumber: number;

  @prop({ required: true, unique: true })
  name: string;
}

export { Career };
