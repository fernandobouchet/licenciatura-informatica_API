import { prop, Ref } from '@typegoose/typegoose';

class Course {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true, unique: true })
  courseNumber: number;

  @prop()
  area: string;

  @prop()
  hsWeekly: number;

  @prop()
  hsTotal: number;

  @prop({ default: false })
  hasCorrelatives: boolean;

  @prop({ ref: () => Course })
  correlatives: Ref<Course>[];

  @prop({ default: false })
  hasOptatives: boolean;

  @prop({ ref: () => Course })
  optatives: Ref<Course>[];

  @prop({ default: false })
  hasEquivalents: boolean;

  @prop({ ref: () => Course })
  equivalents: Ref<Course>[];
}

export { Course };
