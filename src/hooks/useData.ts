import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { Timespan } from '@/components/SettingsContext';

const useData = (timespan: Timespan, filter: undefined | string) => {
	const url = `/api/data/all?`;

	const searchParams = new URLSearchParams();

	if (timespan.start) {
		searchParams.set('start', timespan.start.toDate().toString());
	}

	if (timespan.end) {
		searchParams.set('end', timespan.end.toDate().toString());
	}

	if (filter) {
		searchParams.set('filter', filter);
	}

	const queryParams = searchParams.toString();

	const { data, error, isLoading, mutate } = useSWR(
		`${url}${queryParams}`,
		fetcher,
		{ keepPreviousData: true }
	);

	return { data, error, isLoading, mutate };
};

export default useData;
