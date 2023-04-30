import { Request } from 'express';

interface UserRequest extends Request {
  user?: Express.User & { id?: string };
}

export { UserRequest };
