import styles from './Header.module.scss';
import Search from './components/Search';
import Timespan from './components/Timespan';

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.left}>_Stats</div>
			<div className={styles.right}>
				<Search />
				<div className={styles.timespan}>
					<Timespan />
				</div>
			</div>
		</div>
	);
};

export default Header;
