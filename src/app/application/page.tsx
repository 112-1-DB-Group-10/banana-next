'use server';

import { getUserSession } from '@/lib/session';
import ApplicationForm from './application-form';


const Application = async () => {
  const session = await getUserSession()
  console.log(session.user_id)
  return (
    <ApplicationForm user_id={session.user_id}/>
  )
}

export default Application