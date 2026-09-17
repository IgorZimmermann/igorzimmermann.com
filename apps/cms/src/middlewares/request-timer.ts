import type { Core } from "@strapi/strapi"

const requestTimer: Core.MiddlewareFactory = (_config, { strapi }) => {
	return async (ctx, next) => {
		const start = Date.now()
		try {
			await next()
		}
		finally {
			const ms = Date.now() - start
			if (ms > 1000 && ctx.path !== "/_health") {
				strapi.log.warn(`[slow] ${ctx.method} ${ctx.url} ${ctx.status} ${ms}ms`)
			}
		}
	}
}

export default requestTimer
