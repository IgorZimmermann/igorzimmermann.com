import { z } from "zod"

const envSchema = z.object({
	STRAPI_URL: z.url(),
	STRAPI_TOKEN: z.string().min(1),
})

/* eslint-disable-next-line node/no-process-env */
const env = envSchema.parse(process.env)

export default env
