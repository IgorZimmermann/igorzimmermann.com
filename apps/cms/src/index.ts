import { monitorEventLoopDelay } from "node:perf_hooks"

export default {
	register() { },
	bootstrap() {
		const h = monitorEventLoopDelay({ resolution: 20 })
		h.enable()
		const report = (tag: string) => {
			const m = process.memoryUsage()
			/* eslint-disable-next-line no-console */
			console.log(
				`[${tag}] rss=${(m.rss / 1e6) | 0}MB heap=${(m.heapUsed / 1e6) | 0}/${(m.heapTotal / 1e6) | 0}MB `
				+ `ext=${(m.external / 1e6) | 0}MB lagMax=${(h.max / 1e6) | 0}ms uptime=${process.uptime() | 0}s`,
			)
			h.reset()
		}
		setInterval(() => report("stats"), 15_000).unref()
		process.on("SIGTERM", () => report("SIGTERM"))
	},
}
