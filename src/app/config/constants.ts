export const MONTHS = [
	"Jan",
	"Fev",
	"Mar",
	"Abr",
	"Mai",
	"Jun",
	"Jul",
	"Ago",
	"Set",
	"Out",
	"Nov",
	"Dez",
];

export const YEARS = Array.from({ length: 5 }, (_, i) =>
	String(new Date().getFullYear() - (4 - i))
);
