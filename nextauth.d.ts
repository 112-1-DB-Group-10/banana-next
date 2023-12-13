import 'next-auth';
import { UserSelect } from '@/db/types';

declare module 'next-auth' {
  interface Session {
    user?: UserSelect;
  }
}
