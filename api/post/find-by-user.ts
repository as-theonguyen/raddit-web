import { sendRequest } from '@utils/send-request';

export const getPostsByUser = async (uid: string) => {
  const response = await sendRequest({ path: `users/${uid}/posts` });
  return response;
};
