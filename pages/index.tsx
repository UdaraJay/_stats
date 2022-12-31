import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.scss';
import Feed from '../src/components/Feed';
import SidebarCounters from '../src/components/SidebarCounters';
import EventTypes from '../src/components/EventTypes';
import SidebarTypes from '../src/components/SidebarTypes';
import HourlyChart from '../src/components/HourlyChart';
import Header from '../src/components/Header';
import { useSettings } from '../src/components/SettingsContext';
import useData from '../src/hooks/useData';
import Pause from '../src/components/Pause';
import FuzzySearch from 'fuzzy-search';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const { settings, setSettings } = useSettings();

	const { data, mutate } = useData(settings.timespan, '');

	const refreshData = async () => {
		mutate();
	};

	// Refresh data loop
	useEffect(() => {
		const intervalId = setInterval(() => {
			if (settings.paused) return;

			refreshData();
		}, 5000);
		return () => clearInterval(intervalId);
	}, [settings.paused]);

	let { events = [], urls = [] } = data ?? {};

	const filteredEvents = useMemo(() => {
		if (settings.filter && events) {
			const searcher = new FuzzySearch(events, ['url', 'type'], {
				caseSensitive: false,
				sort: true,
			});

			return searcher.search(settings.filter);
		}

		return events;
	}, [settings.filter, events]);

	return (
		<>
			<Head>
				<title>_Stats</title>
				<meta name="description" content="Self-hosted analytics provider." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<script async src={`https://stats.udara.io/api/stats.js`} />
			</Head>

			<main className={`${inter.className} ${styles.main}`}>
				<div className={styles.left}>
					<div className={styles.top}>
						<Pause />
						<SidebarCounters events={filteredEvents} />
						<SidebarTypes events={filteredEvents} />
					</div>
					<div className={styles.footer}>
						<b className={styles.name}>_Stats</b>
						Self-hosted analytics
						<a
							className={styles.credits}
							href="https://udara.io"
							target="_blank"
							rel="noreferrer"
						>
							Made by Udara
						</a>
					</div>
				</div>
				<div className={styles.center}>
					<Header />
					<HourlyChart events={filteredEvents} />
					<EventTypes events={filteredEvents} filterKey={'url'} />
					<Feed events={filteredEvents} />
				</div>
			</main>
		</>
	);
}
