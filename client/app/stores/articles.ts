import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";

export interface Icon {
	id: number;
	name?: string | null;
	has_image?: boolean | null;
	image?: Image | null;
}

export interface Tag {
	title: string;
}

export interface SubService {
	id: number;
	title: string;
	content: string;
	tags: Tag[];
}

export interface Service {
	id: number;
	title: string;
	slug: string;
	description: string;
	content: string;
	icon: Icon;
	sub_services: SubService[];
}

export interface Article {
	id: number;
	title: string;
	slug: string;
	description: string;
	date: Date;
	content: string;
	cover: Image;
	services: Service[];
}

export const useArticlesStore = defineStore("articles", () => {
	const articles = ref<Article[]>([]);

	const currentArticle = ref<Article>();

	const { find, findOne } = useStrapi();

	async function fetchArticles() {
		const result: Strapi5ResponseMany<Article> = await find<Article>("articles");

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
