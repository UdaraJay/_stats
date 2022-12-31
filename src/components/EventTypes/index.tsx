import styles from './EventTypes.module.scss';

const RealtimeTypes = ({
	events,
	filterKey = 'type',
}: {
	events: [];
	filterKey: string;
}) => {
	const groupBy = (events: []) =>
		events.reduce((objectsByKeyValue: any, obj) => {
			const value = obj[filterKey];

			objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
			return objectsByKeyValue;
		}, {});

	const renderTypes = () => {
		const groups = groupBy(events);

		return Object.entries(groups).map(([key, val]: [string, any], i) => {
			const url = new URL(val[0].url);

			return (
				<tr key={key}>
					<td>{url.hostname}</td>
					<td>{filterKey == 'url' ? url.pathname : key}</td>
					<td>{val.length}</td>
				</tr>
			);
		});

		return null;
	};

	return (
		<div className={styles.card}>
			<div className={styles.day}>
				<div className={styles.heading}>Pathnames</div>
			</div>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>host</th>
						<th>{filterKey}</th>
						<th>events</th>
					</tr>
				</thead>
				<tbody>{renderTypes()}</tbody>
			</table>
		</div>
	);
};

export default RealtimeTypes;
