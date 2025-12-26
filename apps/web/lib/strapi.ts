import { strapi } from "@strapi/client"

import env from "./env"

export const strapiClient = strapi({
	baseURL: env.STRAPI_URL,
	auth: env.STRAPI_TOKEN,
})
