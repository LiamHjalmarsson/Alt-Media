import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Global } from "~/types/global";

export const useGlobalStore = defineStore("global", () => {
	const globalSettings = ref<Global | null>(null);

	const { findOne } = useStrapi();

	async function fetchGlobal() {
		const res: Strapi5ResponseSingle<Global> = await findOne("global");

		globalSettings.value = res.data;

		return globalSettings.value;
	}

	const header = computed(() => globalSettings.value?.navigation);

	const footer = computed(() => globalSettings.value?.footer);

	const seo = computed(() => globalSettings.value?.seo);

	const socialMedias = computed(() => globalSettings.value?.social_medias);

	return { globalSettings, header, footer, seo, socialMedias, fetchGlobal };
});
