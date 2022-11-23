import { sendRequest } from '@utils/send-request';

export const getOneUser = async (uid: string) => {
  const response = await sendRequest({ path: `users/${uid}` });
  return response;
};
