import { HttpLink } from '@apollo/client'
import {
	ApolloClient,
	InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'

// have a function to create a client for you
export function makeClient() {
	const httpLink = new HttpLink({
		// this needs to be an absolute url, as relative urls cannot be used in SSR
		uri: process.env.NEXT_PUBLIC_PB_API_URL!,
		// you can disable result caching here if you want to
		// (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
		fetchOptions: { cache: 'no-store' },
		// you can override the default `fetchOptions` on a per query basis
		// via the `context` property on the options passed as a second argument
		// to an Apollo Client data fetching hook, e.g.:
		// const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
		credentials: 'include',
	})

	// use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
	return new ApolloClient({
		// use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
		cache: new InMemoryCache(),
		link: httpLink,
	})
}
