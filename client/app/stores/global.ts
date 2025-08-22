import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Global } from "~/types/global";

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
