import styles from './SidebarTypes.module.scss';
import IconByType from '@/utils/iconsbyType';

const RealtimePills = ({
	events,
	filterKey = 'type',
}: {
	events: [];
	filterKey?: string;
}) => {
	const groupBy = (events: [], filterKey: any) =>
		events.reduce((objectsByKeyValue: any, obj) => {
			const value = obj[filterKey];

			objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
			return objectsByKeyValue;
		}, {});

	const renderIcon = (type: string) => {
		const Icon = IconByType.hasOwnProperty(type)
			? IconByType[type][0]
			: IconByType.default[0];
		const color = IconByType.hasOwnProperty(type)
			? IconByType[type][1]
			: IconByType.default[1];

		return <Icon className={styles.icon} style={{ color: color }} />;
	};

	const renderTypes = () => {
		const groups = groupBy(events, filterKey);

		return Object.entries(groups).map(([key, val]: [string, any], i) => {
			const url = new URL(val[0].url);

			return (
				<div className={styles.pill} key={key}>
					<div className={styles.type}>
						{renderIcon(key)}
						{key}
					</div>
					<div className={styles.num}>{val.length}</div>
				</div>
			);
		});
	};

	return <div className={styles.pills}>{renderTypes()}</div>;
};

export default RealtimePills;
