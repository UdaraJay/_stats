/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		swcPlugins: [
			[
				'next-superjson-plugin',
				{
					excluded: [],
				},
			],
		],
	},
};

module.exports = nextConfig;
