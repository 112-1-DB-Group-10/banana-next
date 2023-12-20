'use server';

import { getLocationOrigin } from 'next/dist/shared/lib/utils';
import { getUserById } from '@/actions/userActions';
import { getUserSession } from '@/lib/session';
import CreateForm from './create-form';

const Create = async () => {
  const session = await getUserSession();
  const user_data = await getUserById(session.user_id);
  console.log(session.user_id);

  return <CreateForm user_id={session.user_id} user_data={user_data} />;
};

export default Create;
