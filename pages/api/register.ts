import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
    {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({ error: data.message });
  }

  const sessionCookie = serialize('__sess', data.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365 * 10,
    path: '/',
  });

  res.setHeader('Set-Cookie', sessionCookie);

  return res.status(response.status).json({
    data: data.user,
  });
};

export default handler;
