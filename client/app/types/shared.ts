export interface Image {
	name: string;
	width: number;
	height: number;
	url: string;
	provider?: string;
	formats?: null;
	caption?: string;
	alternativeText?: string;
}

export interface Button {
	label: string;
	type?: ButtonType | null;
	variant?: Variant;
	url?: string | null;
}

export interface Link {
	label: string;
	url: string | null;
	variant?: Variant;
}

export interface Icon {
	id: number;
	name: string;
	has_image: boolean | null;
	image: Image | null;
}

export interface ListItem {
	id: number;
	title: string;
	description: string;
}

export type AlignContent = "left" | "center" | "right";

export type Variant =
	| "primary"
	| "primary-outline"
	| "secondary"
	| "secondary-outline"
	| "tertiary"
	| "tertiary-outline"
	| "ghost";

export type ButtonType = "button" | "submit" | "reset";

export type Size = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type Theme = "dark" | "light";
