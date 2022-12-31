import { nanoid } from 'nanoid';
import FuzzySearch from 'fuzzy-search';
import prisma from '@/utils/database';
import moment from 'moment';

export type Event = {
	id: string;
	url: string;
	type: string;
	country: string;
	city: string;
	timestamp: Date;
	collectorId: string;
};

export const createEvent = async (
	type: string,
	url: string,
	collector: string,
	country: string,
	city: string
) => {
	const event = await prisma.event.create({
		data: {
			id: nanoid(9),
			url: url,
			type: type,
			collectorId: collector,
			country: country,
			city: city,
			timestamp: moment().toDate(),
		},
	});

	const urlModel = await prisma.url.upsert({
		where: { url: url },
		update: {
			totalEvents: {
				increment: 1,
			},
		},
		create: {
			url: url,
			firstSeen: moment().toDate(),
		},
	});

	return event.id;
};

export const getEvents = async (
	start: Date,
	end: Date,
	filter: string | string[] | undefined
): Promise<Event[]> => {
	let events = await prisma.event.findMany({
		where: {
			timestamp: {
				gte: start,
				lte: end,
			},
		},
		take: 2500,
		orderBy: { timestamp: 'desc' },
	});

	if (filter) {
		const searcher = new FuzzySearch(events, ['url', 'type'], {
			caseSensitive: false,
			sort: true,
		});

		events = searcher.search(<string>filter);
	}

	return events;
};
