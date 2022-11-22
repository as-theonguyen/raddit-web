import { sendRequest } from '@utils/send-request';

export const getAllPosts = async () => {
  const response = await sendRequest({ path: 'posts' });
  return response;
};
