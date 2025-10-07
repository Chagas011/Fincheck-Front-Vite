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

export const COLORS = [
	{ bg: "#F87171", color: "#7F1D1D" }, // vermelho
	{ bg: "#FB923C", color: "#7C2D12" }, // laranja
	{ bg: "#FACC15", color: "#78350F" }, // amarelo
	{ bg: "#4ADE80", color: "#14532D" }, // verde
	{ bg: "#2DD4BF", color: "#134E4A" }, // turquesa
	{ bg: "#38BDF8", color: "#0C4A6E" }, // azul claro
	{ bg: "#60A5FA", color: "#1E3A8A" }, // azul médio
	{ bg: "#818CF8", color: "#312E81" }, // índigo
	{ bg: "#A78BFA", color: "#4C1D95" }, // roxo
	{ bg: "#E879F9", color: "#701A75" }, // rosa
	{ bg: "#FDA4AF", color: "#831843" }, // rosa claro
	{ bg: "#94A3B8", color: "#0F172A" }, // cinza azulado
];
