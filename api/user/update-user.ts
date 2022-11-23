import { sendRequest } from '@utils/send-request';
import { getAuthToken } from '@utils/token';

export const updateUser = async (uid: string, body: string) => {
  const token = await getAuthToken();
  const response = await sendRequest({
    path: `users/${uid}`,
    method: 'PATCH',
    body,
    token,
  });

  return response;
};
