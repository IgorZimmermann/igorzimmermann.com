import createConfig from "@personal/eslint-config/create-config"

export default createConfig({
	react: true,
	ignores: [
		"**/generated",
	],
}, {
	rules: {
		"antfu/top-level-function": "off",
		"unicorn/filename-case": ["error", {
			case: "kebabCase",
			ignore: ["README.md", "~__root.tsx"],
		}],
	},
})
