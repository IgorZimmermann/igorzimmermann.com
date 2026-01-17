import vm from "node:vm"

import env from "./env"

type siteVariables = {
	sites: string[]
	ringName: string
	ringID: string
	indexPage: string
}

export async function loadBookClubSites(): Promise<siteVariables | null> {
	const resp = await fetch("https://isak.me/onionring/onionring-variables.js", { cache: "no-cache" })

	if (!resp.ok) {
		return null
	}

	const source = await resp.text()

	const context = {
		sites: [
			"",
		],
		ringName: "",
		ringID: "",
		indexPage: "",
	}

	vm.createContext(context)

	vm.runInContext(source, context, {
		timeout: 500,
	})

	try {
		const variables: siteVariables = {
			...context,
		}

		if (env.NODE_ENV === "development" && typeof variables.sites.find(x => x.startsWith(env.DOMAIN)) === "undefined") {
			variables.sites.push(env.DOMAIN)
		}

		return variables
	}
	catch {
		return null
	}
}
