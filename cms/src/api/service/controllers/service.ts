/**
 * service controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::service.service", ({ strapi }) => ({
	async findOne(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { id } = ctx.params;

		const { results } = await strapi.service("api::service.service").find({
			...sanitizedQuery,
			filters: { slug: id },
			where: { slug: id },
			fields: ["id", "title", "slug", "content", "description"],
			populate: {
				sub_services: {
					fields: ["title", "content"],
					populate: {
						tags: {
							fields: "title",
						},
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
		});

		const entity = results?.[0];

		if (!entity) {
			return ctx.notFound("Service not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},

	async find(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { results, pagination } = await strapi.service("api::service.service").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug", "description", "content"],
			populate: {
				sub_services: {
					fields: ["title", "content"],
					populate: {
						tags: {
							fields: "title",
						},
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
		});

		const sanitizedEntity = await this.sanitizeOutput(results, ctx);

		return this.transformResponse(sanitizedEntity, { pagination });
	},
}));

