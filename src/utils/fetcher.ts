import { Fetcher } from 'swr';

export const fetcher: Fetcher<any, string> = (...args) =>
	fetch(...args).then((res) => res.json());
