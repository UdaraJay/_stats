import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { config } from '@/config';

export const defaultCors = Cors({
	methods: ['OPTIONS', 'GET'],
	origin: config.CORS_ALLOWED_ORIGIN,
});

// Credit: https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts
function corsMiddleware(req: NextApiRequest, res: NextApiResponse) {
	return new Promise((resolve, reject) => {
		defaultCors(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

export default corsMiddleware;
