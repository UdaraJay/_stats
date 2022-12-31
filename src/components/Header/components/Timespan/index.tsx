import styles from './Timespan.module.scss';
import { useSettings, timespans } from '../../../SettingsContext';

const Timespan = () => {
	const { settings, setSettings } = useSettings();

	const onChangeTimespan = (span: string) => {
		setSettings({
			...settings,
			timespan: timespans[span as keyof typeof timespans],
		});

		if (typeof window.collectStats === 'function') {
			window.collectStats('change_timespan');
		}
	};

	const isActiveClass = (span: string) => {
		if (
			settings.timespan.text === timespans[span as keyof typeof timespans].text
		) {
			return styles.active;
		}
	};

	return (
		<div className={styles.timespan}>
			<div
				className={`${styles.slot} ${isActiveClass('today')}`}
				onClick={() => onChangeTimespan('today')}
			>
				Today
			</div>
			<div
				className={`${styles.slot} ${isActiveClass('yesterday')}`}
				onClick={() => onChangeTimespan('yesterday')}
			>
				Yesterday
			</div>
			<div
				className={`${styles.slot} ${isActiveClass('week')}`}
				onClick={() => onChangeTimespan('week')}
			>
				7 Days
			</div>
		</div>
	);
};

export default Timespan;
