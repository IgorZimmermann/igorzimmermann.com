export default ({ env }) => [
	"strapi::logger",
	"strapi::errors",
	{
		name: "strapi::security",
		config: {
			contentSecurityPolicy: {
				directives: {
					"img-src": ["'self'", "data:", "blob:", env("R2_PUBLIC_HOST")],
					"media-src": ["'self'", "data:", "blob:", env("R2_PUBLIC_HOST")],
				},
			},
		},
	},
	"strapi::cors",
	"strapi::poweredBy",
	"strapi::query",
	"strapi::body",
	"strapi::session",
	"strapi::favicon",
	"strapi::public",
]
