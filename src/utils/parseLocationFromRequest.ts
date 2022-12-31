import type { NextApiRequest } from 'next';

const parseLocationFromRequest = (
	req: NextApiRequest
): { city: string; country: string } => {
	const headers = req.headers;

	const decodedCountry = decodeURI(<string>headers['x-vercel-ip-country']);
	const decodedCity = decodeURI(<string>headers['x-vercel-ip-city']);

	const country = decodedCountry ?? 'undefined';
	const city = decodedCity ?? 'undefined';

	return { country, city };
};

export default parseLocationFromRequest;
