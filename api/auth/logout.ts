export const logout = async (all: boolean) => {
  let url = '/api/logout';

  if (all) {
    url += '?all=true';
  }

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });

  const jsonData = await response.json();

  if (!response.ok) {
    throw new Error(jsonData.error);
  }

  return jsonData.data;
};
