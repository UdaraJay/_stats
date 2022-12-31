import styles from './Pause.module.scss';
import * as Switch from '@radix-ui/react-switch';
import { useSettings } from '@/components/SettingsContext';

const Pause = () => {
	const { settings, setSettings } = useSettings();

	const toggle = () => {
		if (typeof window.collectStats === 'function') {
			window.collectStats(settings.paused ? 'resume' : 'pause');
		}

		setSettings({ ...settings, paused: !settings.paused });
	};

	return (
		<div className={styles.pause}>
			<form>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Switch.Root
						className={styles.SwitchRoot}
						id="airplane-mode"
						checked={!settings.paused}
						onCheckedChange={toggle}
					>
						<Switch.Thumb className={styles.SwitchThumb} />
					</Switch.Root>
					<label
						className={styles.Label}
						htmlFor="live-pause-unpause"
						style={{ paddingLeft: 12 }}
					>
						{settings.paused ? (
							'Paused'
						) : (
							<div className={styles.live}>Live</div>
						)}
					</label>
				</div>
			</form>
		</div>
	);
};

export default Pause;
