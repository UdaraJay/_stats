import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SettingsProvider } from '../src/components/SettingsContext';

declare global {
	interface Window {
		collectStats: any;
	}
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SettingsProvider>
			<Component {...pageProps} />
		</SettingsProvider>
	);
}
