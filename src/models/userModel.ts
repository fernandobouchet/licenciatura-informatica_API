import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { Career } from './index';
import { SavedCourse } from '../interfaces';

class User {
  @prop({ required: true })
  username: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  avatar: string;

  @prop({ required: true, default: false })
  isAdmin: boolean;

  @prop({ ref: () => Career })
  careers: Ref<Career>[];

  @prop()
  courses: SavedCourse[];

  @prop()
  comments: string[];
}

const Users = getModelForClass(User);

export { User, Users };
