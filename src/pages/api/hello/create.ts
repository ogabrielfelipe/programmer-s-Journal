// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*
import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../../lib/client'

type task = {
    id: string,
    created_at: Date,
    title: string,
    description: string,
}


type Data = {
  name?: string,
  message?: string | null,
  task?: task[] | null
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(404).json({message: "method not found."})
  }

  const data = await supabase.from('task').select();

  console.log(data)
  res.status(200).json(data)
}
*/