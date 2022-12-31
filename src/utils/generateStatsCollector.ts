import { config } from '@/config';
import JavaScriptObfuscator from 'javascript-obfuscator';

const generateStatsCollector = (collectorId: string) => {
	const url = config.APP_URL;

	const js = `
    "use strict"

    function init(){
        document.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                const target = event.target.getAttribute('target');
                const href = event.target.getAttribute('href');
                
                if (target === '_blank') {
                    collect('external_link_click');
                } else {
                    collect('link_click');
                }
            }
        });

        collect('init')
    }

    async function send(type = "pageview") {
        let url = new URL("${url}/api/collect")

        url.searchParams.set('collector', '${collectorId}')
        url.searchParams.set('type', type)
        url.searchParams.set('url', window.location.href)

        fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log("📼", data)
        })
        .catch(rejected => {
            console.log("📼", "failed to collect")
        });
    }

    async function collect(type) {
        await send(type)
    }

    window.collectStats = collect

    collect('loaded')

    window.addEventListener('load', function() {
        init()
    });

    `;

	const obfuscatedJs = JavaScriptObfuscator.obfuscate(js, {
		compact: true,
		controlFlowFlattening: true,
		controlFlowFlatteningThreshold: 1,
		numbersToExpressions: true,
		simplify: true,
		stringArrayShuffle: true,
		splitStrings: true,
		stringArrayThreshold: 1,
	}).getObfuscatedCode();

	return obfuscatedJs;
};

export default generateStatsCollector;
