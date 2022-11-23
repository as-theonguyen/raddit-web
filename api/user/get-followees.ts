import { sendRequest } from '@utils/send-request';

export const getForllowees = async (uid: string) => {
  const response = await sendRequest({ path: `users/${uid}/followees` });
  return response;
};
