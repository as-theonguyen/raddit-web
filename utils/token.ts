export const getAuthToken = async () => {
  const response = await fetch('/api/access-token', {
    headers: {
      'Content-type': 'application/json',
    },
  });

  const { data } = await response.json();

  return data;
};
