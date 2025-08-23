/**
 * page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::page.page", ({ strapi }) => ({
	async findOne(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { id } = ctx.params;

		const { results } = await strapi.service("api::page.page").find({
			...sanitizedQuery,
			filters: { slug: id },
			fields: ["id", "title", "slug"],
			populate: {
				blocks: {
					on: {
						"block.hero": {
							populate: {
								fields: ["id", "title", "colored_title", "description"],
								cover: {
									populate: {
										fields: ["formats", "name", "width", "height", "url", "provider"],
									},
								},
								buttons: {
									fields: ["label", "url", "type", "variant"],
								},
							},
						},
						"block.list": {
							populate: {
								fields: ["id", "title"],
								button: {
									fields: ["label", "url", "type", "variant"],
								},
								items: {
									fields: ["title", "description"],
								},
							},
						},
						"block.info": {
							populate: {
								fields: ["id", "title", "align_content"],
								image: {
									populate: {
										fields: ["formats", "name", "width", "height", "url", "provider"],
									},
								},
								button: {
									fields: ["label", "url", "type", "variant"],
								},
							},
						},
						"block.full-section": {
							populate: {
								fields: ["id", "title", "description"],
								cover: {
									populate: {
										fields: ["formats", "name", "width", "height", "url", "provider"],
									},
								},
								link: {
									fields: ["label", "url", "type", "variant"],
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
									fields: ["title", "slug", "description", "date"],
									populate: {
										cover: {
											fields: ["formats", "name", "width", "height", "url", "provider"],
										},
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

		const entity = results?.[0];

		if (!entity) {
			return ctx.notFound("Page not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

