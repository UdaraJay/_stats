import { nanoid } from 'nanoid';
import prisma from '@/utils/database';

type Url = {
	url: string;
	totalEvents: number;
	firstSeen: Date;
};

export const getUrls = async (
	start: Date,
	end: Date,
	filter: string | string[] | undefined
): Promise<Url[]> => {
	let urls = await prisma.url.findMany({
		take: 50,
		orderBy: { firstSeen: 'desc' },
	});

	return urls;
};
