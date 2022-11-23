import { sendRequest } from '@utils/send-request';
import { getAuthToken } from '@utils/token';

export const unfollow = async (followeeId: string) => {
  const token = await getAuthToken();
  const response = await sendRequest({
    path: `follows/${followeeId}`,
    method: 'DELETE',
    token,
  });
  return response;
};
