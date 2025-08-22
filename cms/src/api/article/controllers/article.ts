/**
 * article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::article.article", ({ strapi }) => ({
	// Find Article to fetch by slug instad of id
	async findOne(ctx) {
		const { id } = ctx.params;

		const entity = await strapi.db.query("api::article.article").findOne({
			where: { slug: id },
			select: ["id", "title", "slug", "description", "content", "date"],
			populate: {
				cover: {
					select: ["formats", "name", "width", "height", "url", "provider"],
				},
				services: {
					select: ["title", "slug", "description", "content"],
					populate: {
						sub_services: {
							select: ["title", "content"],
							populate: {
								tags: {
									select: "title",
								},
							},
						},
						icon: {
							select: ["name", "has_image"],
							populate: {
								image: {
									select: ["formats", "name", "width", "height", "url", "provider"],
								},
							},
						},
					},
				},
			},
		});

		if (!entity) {
			return ctx.notFound("Article not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

