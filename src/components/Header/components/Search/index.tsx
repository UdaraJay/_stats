import styles from './Search.module.scss';
import { useSettings } from '../../../SettingsContext';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const Search = () => {
	const [filter, setFilter] = useState('');
	const { settings, setSettings } = useSettings();

	const record = () => {
		if (typeof window.collectStats === 'function') {
			window.collectStats('filter');
		}
	};

	const onKeydownHandler = (e: any) => {
		const value = e.target.value;
		setFilter(value);
		record();
	};

	useEffect(() => {
		setSettings({ ...settings, filter });
	}, [filter]);

	const reset = () => {
		setFilter('');
		setSettings({ ...settings, filter: '' });
	};

	return (
		<div className={styles.search}>
			<div className={styles.bar}>
				<MagnifyingGlassIcon className={styles.icon} />
				<input
					className={styles.input}
					placeholder="Filter events"
					value={filter}
					onChange={onKeydownHandler}
				/>
				{settings.filter !== '' && (
					<div className={styles.reset} onClick={reset}>
						reset
					</div>
				)}
			</div>
		</div>
	);
};

export default Search;
