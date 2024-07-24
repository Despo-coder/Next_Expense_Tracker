'use server'
import { NextApiRequest, NextApiResponse } from 'next';
import getIncomeExpense from '@/app/actions/getIncomeExpense';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await getIncomeExpense();
  res.status(200).json(data);
}
