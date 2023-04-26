import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { Career } from './index';

class User {
  @prop({ required: true, unique: true })
  googleId: string;

  @prop({ required: true })
  username: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  avatar: string;

  @prop({ required: true, default: 'student' })
  role: string;

  @prop({ ref: () => Career })
  careers: Ref<Career>[];

  @prop()
  courses: string[];

  @prop()
  comments: string[];
}

const Users = getModelForClass(User);

export { User, Users };
