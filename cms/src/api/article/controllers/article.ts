/**
 * article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::article.article", ({ strapi }) => ({
	async findOne(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { id } = ctx.params;

		const { results } = await strapi.service("api::article.article").find({
			...sanitizedQuery,
			filters: { slug: id },
			fields: ["id", "title", "slug", "description", "content", "date"],
			populate: {
				cover: {
					fields: ["formats", "name", "width", "height", "url", "provider"],
				},
				services: {
					fields: ["title", "slug", "description", "content"],
					populate: {
						sub_services: {
							fields: ["title", "content"],
							populate: {
								tags: { fields: ["title"] },
							},
						},
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
			publicationState: "live",
			limit: 1,
		});

		const entity = results?.[0];

		if (!entity) {
			return ctx.notFound("Article not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},

	async find(ctx) {
		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { results, pagination } = await strapi.service("api::article.article").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug", "description", "date"],
			populate: {
				cover: {
					fields: ["formats", "name", "width", "height", "url", "provider"],
				},
				services: {
					fields: ["title", "slug"],
				},
			},
		});

		if (!results || results.length === 0) {
			return ctx.notFound("Articles not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(results, ctx);

		return this.transformResponse(sanitizedEntity, { pagination });
	},
}));

