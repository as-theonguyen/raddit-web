import { sendRequest } from '@utils/send-request';

export const getFollowers = async (uid: string) => {
  const response = await sendRequest({ path: `users/${uid}/followers` });
  return response;
};
