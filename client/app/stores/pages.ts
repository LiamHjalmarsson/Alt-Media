import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Page } from "~/types/collections/pages";

export const usePageStore = defineStore("pages", () => {
	const { findOne } = useStrapi();

	async function fetchPage(id: string) {
		const res: Strapi5ResponseSingle<Page> = await findOne("pages", id);

		console.log(res.data);
		return res.data;
	}

	return { fetchPage };
});
