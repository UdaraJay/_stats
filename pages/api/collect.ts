// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import corsMiddleware from '@/utils/corsMiddleware';
import { extractParamsForCollector } from '@/models/Collector';

import { createEvent } from '@/models/Events';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await corsMiddleware(req, res);

	let { type, url, collector, country, city, error } =
		await extractParamsForCollector(req);

	if (error) return res.status(400).json({ status: 'failed' });

	// record the event
	await createEvent(type, url, collector, country, city);

	res.status(200).json({ status: 'success' });
}
