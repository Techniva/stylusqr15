import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, phone, email, company, title, address, website } = req.body;

      if (!name || !phone || !email) {
        return res.status(400).json({ error: 'Name, phone, and email are required.' });
      }

      const vCard = await prisma.vCard.create({
        data: {
          name,
          phone,
          email,
          company,
          title,
          address,
          website,
        },
      });

      return res.status(201).json(vCard);
    } catch (error) {
      console.error('Error saving vCard:', error);
      return res.status(500).json({ error: 'Failed to save vCard.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}