import type { DocumentNode, OperationVariables, TypedDocumentNode } from "@apollo/client"

import { HttpLink } from "@apollo/client"
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient,
} from "@apollo/client-integration-nextjs"
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

/* -------------------------------------------------------------------------- */
/*                        Stale-while-revalidate cache                         */
/* -------------------------------------------------------------------------- */

type CacheEntry = {
	value?: { data: unknown, updatedAt: number }
	pending?: Promise<unknown>
}

// Upper bound so random slugs (bots, typos) can't grow the cache forever.
const MAX_ENTRIES = 500

// Stored on globalThis so it survives hot reloads in dev and is shared by
// every module instance in the same Node process.
const globalStore = globalThis as typeof globalThis & {
	__cmsCache?: Map<string, CacheEntry>
}
const store = (globalStore.__cmsCache ??= new Map<string, CacheEntry>())

function getEntry(key: string): CacheEntry {
	const existing = store.get(key)

	if (existing) {
		// Re-insert so the Map's insertion order doubles as "least recently used".
		store.delete(key)
		store.set(key, existing)
		return existing
	}

	if (store.size >= MAX_ENTRIES) {
		const oldest = store.keys().next().value
		if (oldest !== undefined)
			store.delete(oldest)
	}

	const entry: CacheEntry = {}
	store.set(key, entry)
	return entry
}

function refresh<R>(entry: CacheEntry, fetcher: () => Promise<R>): Promise<R> {
	// Only one request per key at a time; concurrent callers share it.
	// (This also dedupes generateMetadata + the page asking for the same data.)
	entry.pending ??= fetcher()
		.then((data) => {
			entry.value = { data, updatedAt: Date.now() }
			return data
		})
		.finally(() => {
			entry.pending = undefined
		})

	return entry.pending as Promise<R>
}

export async function staleWhileRevalidate<R>(
	key: string,
	maxAgeSeconds: number,
	fetcher: () => Promise<R>,
): Promise<R> {
	const entry = getEntry(key)

	// Nothing cached yet (e.g. first request since the server started):
	// there is nothing to fall back on, so we have to wait for the CMS.
	if (!entry.value)
		return refresh(entry, fetcher)

	const age = Date.now() - entry.value.updatedAt

	if (age > maxAgeSeconds * 1000) {
		// Serve the old data immediately and refresh in the background.
		// If the refresh fails (CMS asleep, timeout, 5xx...), the old data is kept
		// and the next request simply tries again.
		refresh(entry, fetcher).catch((error) => {
			console.error(`[cacheQuery] background refresh failed for "${key}"`, error)
		})
	}

	return entry.value.data as R
}

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
	// Variables are part of the key so two different queries can never
	// accidentally share an entry just because they were given the same key.
	const cacheKey = [...key, JSON.stringify(variables ?? {})].join(":")

	return staleWhileRevalidate(cacheKey, revalidate, () =>
		query<T>({
			query: document,
			variables,
		}))
}
