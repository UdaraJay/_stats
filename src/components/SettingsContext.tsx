import {
	useState,
	useContext,
	createContext,
	useCallback,
	ReactNode,
} from 'react';
import moment from 'moment';

export type Timespan = {
	text: string;
	start: moment.Moment;
	end: moment.Moment;
};

export type Settings = {
	filter: string;
	paused: boolean;
	timespan: Timespan;
};

export const timespans = {
	today: {
		text: 'Today',
		start: moment().startOf('day'),
		end: moment().endOf('day'),
	},
	yesterday: {
		text: 'Yesterday',
		start: moment().subtract(1, 'days').startOf('day'),
		end: moment().subtract(1, 'days').endOf('day'),
	},
	week: {
		text: '7 days',
		start: moment().subtract(7, 'days').startOf('day'),
		end: moment().subtract(7, 'days').endOf('week'),
	},
	month: {
		text: '30 days',
		start: moment().subtract(1, 'months').startOf('day'),
		end: moment().subtract(1, 'months').endOf('month'),
	},
};

const defaultSettings = {
	paused: false,
	timespan: timespans.today,
	filter: '',
};

const SettingsContext = createContext({
	settings: defaultSettings,
	setSettings: (settings: Settings) => {},
});

function SettingsProvider({ children }: { children: ReactNode }) {
	const [settings, setSettings] = useState(defaultSettings);

	return (
		<SettingsContext.Provider value={{ settings, setSettings }}>
			{children}
		</SettingsContext.Provider>
	);
}

function useSettings() {
	const settings = useContext(SettingsContext);

	if (settings === undefined) {
		throw new Error('useSettings must be used within a SettingsProvider');
	}

	return settings;
}

export { SettingsProvider, useSettings };
