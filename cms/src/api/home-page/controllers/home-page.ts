/**
 * home-page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::home-page.home-page", ({ strapi }) => ({
	async find(ctx) {
		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const entity = await strapi.service("api::home-page.home-page").find({
			...sanitizedQuery,
			fields: ["id", "documentId"],
			populate: {
				hero: {
					fields: ["id", "title", "colored_title", "description"],
					populate: {
						cover: {
							populate: {
								fields: ["formats", "name", "width", "height", "url", "provider"],
							},
						},
						form: {
							fields: ["title", "description"],
							populate: {
								button: {
									fields: ["label", "type", "variant"],
								},
								input: {
									fields: ["label", "type", "name", "placeholder", "required"],
								},
								select: {
									fields: ["label", "name", "options", "required"],
								},
								textarea: {
									fields: ["label", "name", "placeholder", "rows", "required"],
								},
							},
						},
						buttons: {
							fields: ["label", "url", "type", "variant"],
						},
						links: {
							fields: ["label", "url", "variant"],
						},
					},
				},
				blocks: {
					on: {
						"block.list": {
							fields: ["id", "title"],
							populate: {
								button: {
									fields: ["label", "url", "type", "variant"],
								},
								link: {
									fields: ["label", "url", "variant"],
								},
								items: {
									fields: ["title", "description"],
								},
							},
						},
						"block.solution": {
							fields: ["id", "title"],
							populate: {
								items: {
									fields: ["title", "description"],
									populate: "*",
								},
							},
						},
						"block.info": {
							fields: ["id", "title", "align_content"],
							populate: {
								image: {
									populate: {
										fields: ["formats", "name", "width", "height", "url", "provider"],
									},
								},
								button: {
									fields: ["label", "url", "type", "variant"],
								},
								link: {
									fields: ["label", "url", "variant"],
								},
							},
						},
						"block.full-section": {
							fields: ["id", "title", "description"],
							populate: {
								cover: {
									populate: {
										fields: ["formats", "name", "width", "height", "url", "provider"],
									},
								},
								link: {
									fields: ["label", "url", "variant"],
								},
							},
						},
						"block.faq": {
							populate: {
								fields: ["id", "title"],
								items: {
									fields: ["title", "description"],
								},
							},
						},
						"block.featured-services": {
							populate: {
								fields: ["id", "title"],
								services: {
									fields: ["title", "slug", "description"],
									populate: {
										icon: {
											fields: ["name", "has_image"],
											populate: {
												image: {
													fields: ["formats", "name", "width", "height", "url", "provider"],
												},
											},
										},
									},
								},
							},
						},
						"block.featured-articles": {
							populate: {
								fields: ["id", "title"],
								articles: {
									fields: ["id", "title", "slug", "description", "date"],
									populate: {
										cover: { fields: ["formats", "name", "width", "height", "url", "provider"] },
									},
								},
							},
						},
						"block.featured-projects": {
							populate: {
								fields: ["id", "title"],
								projects: {
									fields: ["title", "slug"],
									populate: {
										cover: {
											fields: ["formats", "name", "width", "height", "url", "provider"],
										},
									},
								},
							},
						},
					},
				},
			},
		});

		if (!entity) {
			return ctx.notFound("Home page not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

