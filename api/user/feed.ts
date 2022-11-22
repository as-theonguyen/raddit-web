import { sendRequest } from '@utils/send-request';
import { getAuthToken } from '@utils/token';

export const feed = async (userId: string) => {
  const token = await getAuthToken();
  const response = await sendRequest({ path: `users/${userId}/feed`, token });
  return response;
};
