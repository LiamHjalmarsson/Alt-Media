export interface Image {
	name: string;
	width: number;
	height: number;
	url: string;
	provider?: string;
	formats?: null;
}

export interface Button {
	label: string;
	type?: null;
	variant?: null;
	url?: string | null;
}

export interface Icon {
	id: number;
	name?: string | null;
	has_image?: boolean | null;
	image?: Image | null;
}
