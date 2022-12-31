import type { NextApiRequest, NextApiResponse } from 'next';
import generateStatsCollector from '@/utils/generateStatsCollector';
import { createCollector } from '@/models/Collector';
import corsMiddleware from '@/utils/corsMiddleware';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await corsMiddleware(req, res);

	const origin = req.headers.origin ?? '';

	const collectorId = await createCollector(origin);

	const obfuscatedJs = generateStatsCollector(collectorId);

	res
		.setHeader('Content-Type', 'application/javascript')
		.setHeader('Cache-Control', 'private, max-age=0, must-revalidate')
		.status(200)
		.send(obfuscatedJs);
}
