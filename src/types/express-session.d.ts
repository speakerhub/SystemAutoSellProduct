import session, { SessionData } from 'express-session';
import User from '@entitiesUser';

declare module 'express-session' {
  interface SessionData {
    _user?: User;
  }
}
  
