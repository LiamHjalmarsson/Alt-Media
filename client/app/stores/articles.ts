import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Article } from "~/types/collections/articles";

export const useArticleStore = defineStore("articles", () => {
	const articles = ref<Article[]>([]);

	const currentArticle = ref<Article>();

	const { find, findOne } = useStrapi();

	async function fetchArticles(service?: string | null) {
		const params: any = {};

		if (service) {
			params.filters = {
				services: {
					title: { $eqi: service },
				},
			};
		}

		const result: Strapi5ResponseMany<Article> = await find<Article>("articles", params);

		articles.value = result.data || [];

		return articles.value;
	}

	async function fetchArticle(id: string) {
		const result: Strapi5ResponseSingle<Article> = await findOne<Article>("articles", id);

		currentArticle.value = result.data;

		return currentArticle.value;
	}

	return { articles, currentArticle, fetchArticles, fetchArticle };
});
