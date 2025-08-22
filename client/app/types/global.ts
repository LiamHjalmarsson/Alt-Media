import type { Button, Image } from "./shared";

export interface MenuLink {
	title: string;
	url: string;
}

export interface Navigation {
	id: number;
	logo: Image;
	links: MenuLink[];
}
export interface FooterColumn {
	id: number;
	title: string;
	url: string;
	links: MenuLink[];
}

export interface Footer {
	id: number;
	title: string;
	description: string;
	button: Button;
	footer_column: FooterColumn[];
}

export interface Seo {
	meta_title: string;
	meta_description: string;
	meta_cannical_url: string;
	prevent_index?: boolean | null;
	meta_image: Image;
}

export interface Global {
	id: number;
	site_name: string;
	favicon: Image;
	navigation: Navigation;
	footer: Footer;
	seo: Seo;
}
