import styles from './HourlyChart.module.scss';
import moment from 'moment';

const dayDefault = [
	['00', '12 AM'],
	['01', '1'],
	['02', '2'],
	['03', '3'],
	['04', '4'],
	['05', '5'],
	['06', '6'],
	['07', '7'],
	['08', '8'],
	['09', '9'],
	['10', '10'],
	['11', '11'],
	['12', '12 PM'],
	['13', '1'],
	['14', '2'],
	['15', '3'],
	['16', '4'],
	['17', '5'],
	['18', '6'],
	['19', '7'],
	['20', '8'],
	['21', '9'],
	['22', '10'],
	['23', '11'],
];

const DayChart = ({ events }: { events: [] }) => {
	// TODO: this groups all the events by HH, even when we have timespans above
	// 24 hours. Augment the chart for different timespans.
	const groupBy = (events: []) =>
		events.reduce((objectsByKeyValue: any, obj) => {
			const value = moment(obj['timestamp']).format('HH');
			objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
			return objectsByKeyValue;
		}, {});

	const groups = groupBy(events);

	const max = Math.max(
		...(Object.entries(groups).map(([key, val]: [string, any]) => val.length) ??
			[])
	);

	const renderTypes = () => {
		return dayDefault.map(([key, keyhh]) => {
			const val = groups[key] ?? [];

			const asPercentOfTotal = Math.ceil((100 * val.length) / max);

			const current = moment().format('HH');

			return (
				<div className={styles.pill} key={key}>
					<div className={styles.bar}>
						<div
							className={styles.fill}
							style={{
								height: `${asPercentOfTotal}%`,
							}}
						></div>
					</div>
					<div
						className={styles.type}
						style={{ color: current === key ? '#FDFD96' : 'inherit' }}
					>
						{keyhh}
					</div>
				</div>
			);
		});
	};

	return (
		<div className={styles.day}>
			<div className={styles.day}>
				<div className={styles.heading}>Hourly</div>
			</div>
			<div className={styles.pills}>
				<div className={styles.pill} key={'head'}>
					<div className={styles.head}>
						<div className={styles.top}>{max}</div>
						<div className={styles.top}>{Math.round(max / 2)}</div>
						<div className={styles.top}>0</div>
					</div>
					<div className={styles.num}></div>
					<div className={styles.type}></div>
				</div>
				{renderTypes()}
			</div>
		</div>
	);
};

export default DayChart;
