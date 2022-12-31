import type { NextApiRequest } from 'next';
import Filter from 'bad-words';
import { nanoid } from 'nanoid';
import prisma from '@/utils/database';
import isValidUrl from '@/utils/isValidUrl';
import parseLocationFromRequest from '@/utils/parseLocationFromRequest';
import { config } from '@/config';
import moment from 'moment';

const filter = new Filter();

export const createCollector = async (origin: string) => {
	const collector = await prisma.collector.create({
		data: {
			id: nanoid(9),
			origin: origin,
			timestamp: moment().toDate(),
		},
	});

	return collector.id;
};

// Check if the Collector exists
export const checkIfCollectorExists = async (
	collector: string | null
): Promise<Boolean> => {
	if (!collector) return false;

	return await prisma.collector
		.findFirst({
			where: {
				id: collector,
			},
			select: { id: true },
		})
		.then((r) => Boolean(r));
};

export const extractParamsForCollector = async (
	req: NextApiRequest
): Promise<{
	type: string;
	url: string;
	country: string;
	city: string;
	collector: string;
	error: boolean;
}> => {
	let error = false;

	const urlString = `${config.APP_URL}${req.url}`;
	const _url: URL = new URL(urlString);

	let type = _url.searchParams.get('type');
	let url = _url.searchParams.get('url');
	let collector = _url.searchParams.get('collector');

	// We also filter for profanity
	type = filter.isProfane(<string>type) ? filter.clean(<string>type) : type;
	url = filter.isProfane(<string>url) ? filter.clean(<string>url) : url;

	const missingParams = !type || !url || !collector;
	const invalidUrl = !isValidUrl(<string>url);
	const invalidCollector = !(await checkIfCollectorExists(collector));

	if (missingParams || invalidUrl || invalidCollector) {
		error = true;
	}

	const { country, city } = parseLocationFromRequest(req);

	return {
		type: <string>type,
		url: <string>url,
		collector: <string>collector,
		country,
		city,
		error,
	};
};
