export function formatCurrency(value: number) {
	return Intl.NumberFormat("pt-br", {
		style: "currency",
		currency: "BRL",
	}).format(value);
}
export function numericValue(value: string) {
	return Number(
		String(value)
			.replace(/[^\d,]/g, "")
			.replace(",", ".")
	);
}
