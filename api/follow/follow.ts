import { sendRequest } from '@utils/send-request';
import { getAuthToken } from '@utils/token';

export const follow = async (body: string) => {
  const token = await getAuthToken();
  const response = await sendRequest({
    path: 'follows',
    method: 'POST',
    token,
    body,
  });
  return response;
};
