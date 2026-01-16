export function normalize(input: string): string {
	return input
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036F]/g, "")
		.replace(/ß/g, "ss")
		.replace(/æ/g, "ae")
		.replace(/ø/g, "o")
		.replace(/ /g, "-")
}
