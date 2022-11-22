import { sendRequest } from '@utils/send-request';
import { getAuthToken } from '@utils/token';

export const addNewPost = async (body: string) => {
  const token = await getAuthToken();
  const response = await sendRequest({
    path: 'posts',
    method: 'POST',
    body,
    token,
  });
  return response;
};
