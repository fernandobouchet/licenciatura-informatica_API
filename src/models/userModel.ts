import { Ref, prop } from '@typegoose/typegoose';
import { Career } from './careerModel';

class User {
  @prop({ required: true })
  username: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true, unique: true })
  googleId: string;

  @prop({ ref: () => Career })
  careers: Ref<Career>[];

  @prop({ required: true })
  courses: string[];

  @prop()
  comments: string[];
}

export { User };
