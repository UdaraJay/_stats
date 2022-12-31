import styles from './SidebarCounters.module.scss';
import moment from 'moment';
import { useEffect, useRef } from 'react';

import { CountUp } from 'use-count-up';
import { useSettings } from '../SettingsContext';
import { Event } from '@/models/Events';

const RealtimeMetrics = ({ events }: { events: [] }) => {
	const { settings } = useSettings();
	const fiveMinutesBack = moment().subtract(5, 'minutes');
	const hourBack = moment().subtract(1, 'hours');

	const total = events.length;

	const pastHour = events.filter((e: Event) =>
		moment(e.timestamp).isAfter(hourBack)
	).length;

	const pastFiveMinutes = events.filter((e: Event) =>
		moment(e.timestamp).isAfter(fiveMinutesBack)
	).length;

	const sessions = Object.entries(
		events.reduce((objectsByKeyValue: any, obj) => {
			const value = obj['collectorId'];
			objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
			return objectsByKeyValue;
		}, {})
	).length;

	const prevValues = useRef({ total, pastHour, pastFiveMinutes, sessions });

	useEffect(() => {
		prevValues.current = {
			total,
			pastHour,
			pastFiveMinutes,
			sessions,
		};
	}, [total, pastHour, pastFiveMinutes, sessions]);

	return (
		<div className={styles.cards}>
			<div className={styles.card}>
				<div className={styles.num} key={total}>
					<CountUp
						isCounting
						start={prevValues.current.total}
						end={total}
						duration={3.2}
					/>
				</div>
				<div className={styles.info}>events / 24 hours</div>
			</div>
			<div className={styles.card}>
				<div className={styles.num} key={sessions}>
					<CountUp
						isCounting
						start={prevValues.current.sessions}
						end={sessions}
						duration={3.2}
					/>
				</div>
				<div className={styles.info}>sessions / 24 hours</div>
			</div>
			<div className={styles.card}>
				<div className={styles.num} key={pastHour}>
					<CountUp
						isCounting
						start={prevValues.current.pastHour}
						end={pastHour}
						duration={3.2}
					/>
				</div>
				<div className={styles.info}>events / hour</div>
			</div>
			<div className={styles.card}>
				<div className={styles.num} key={pastFiveMinutes}>
					<CountUp
						isCounting
						start={prevValues.current.pastFiveMinutes}
						end={pastFiveMinutes}
						duration={3.2}
					/>
				</div>
				<div className={styles.info}>events / 5 minutes</div>
			</div>
		</div>
	);
};

export default RealtimeMetrics;
