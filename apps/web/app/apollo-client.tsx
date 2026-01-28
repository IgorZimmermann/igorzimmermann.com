import type { DocumentNode, OperationVariables, TypedDocumentNode } from "@apollo/client"

import { HttpLink } from "@apollo/client"
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient,
} from "@apollo/client-integration-nextjs"
import { unstable_cache } from "next/cache"
import { join } from "node:path"

import env from "../lib/env"

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			// this needs to be an absolute url, as relative urls cannot be used in SSR
			uri: join(env.STRAPI_URL, "/graphql"),
			headers: {
				Authorization: `bearer ${env.STRAPI_TOKEN}`,
			},
			fetchOptions: {
				// you can pass additional options that should be passed to `fetch` here,
				// e.g. Next.js-related `fetch` options regarding caching and revalidation
				// see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
			},
		}),
	})
})

export function cacheQuery<T>(
	{
		key,
		revalidate,
		query: document,
		variables,
	}: {
		key: string[]
		revalidate: number
		query: DocumentNode | TypedDocumentNode<T, OperationVariables>
		variables?: NoInfer<OperationVariables>
	},
) {
	return unstable_cache(
		async () => {
			return query<T>({
				query: document,
				variables,
			})
		},
		key,
		{ revalidate },
	)()
}
