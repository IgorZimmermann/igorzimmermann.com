import { z } from "zod"
import "dotenv/config"

const envSchema = z.object({
	NODE_ENV: z.union([z.literal("development"), z.literal("production")]),

	DOMAIN: z.string(),

	STRAPI_MEDIA: z.url(),
	STRAPI_URL: z.url(),
	STRAPI_TOKEN: z.string().min(1),
})

/* eslint-disable-next-line node/no-process-env */
const env = envSchema.parse(process.env)

export default env
