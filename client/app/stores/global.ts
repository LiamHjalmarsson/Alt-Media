import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";

export interface Image {
	name: string;
	width: number;
	height: number;
	url: string;
	provider?: string;
	formats?: null;
}

export interface MenuLink {
	title: string;
	url: string;
}

export interface Navigation {
	id: number;
	logo: Image;
	links: MenuLink[];
}

export interface Button {
	label: string;
	type?: null;
	variant?: null;
	url?: string | null;
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

export interface Global {
	id: number;
	site_name: string;
	favicon: Image;
	navigation: Navigation;
	footer: Footer;
}

export const useGlobalStore = defineStore("global", () => {
	const globalSettings = ref<Global | null>(null);

	const { findOne } = useStrapi();

	async function fetchGlobal() {
		const res: Strapi5ResponseSingle<Global> = await findOne("global");

		globalSettings.value = res.data;

		console.log("Global", globalSettings.value);

		return globalSettings.value;
	}

	const header = computed(() => globalSettings.value?.navigation);

	const footer = computed(() => globalSettings.value?.footer);

	return { globalSettings, header, footer, fetchGlobal };
});
