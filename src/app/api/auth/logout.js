import { getSession } from 'next-auth/react';
import { removeCookies } from 'cookies-next';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });

  if (session) {
    removeCookies('next-auth.session-token', { req, res });
    removeCookies('next-auth.csrf-token', { req, res });
    res.status(200).json({ message: 'Logged out' });
  } else {
    res.status(400).json({ message: 'No active session' });
  }
}