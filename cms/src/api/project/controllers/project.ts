/**
 * project controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::project.project", ({ strapi }) => ({
	async findOne(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { id } = ctx.params;

		const { results } = await strapi.service("api::project.project").find({
			...sanitizedQuery,
			filters: { slug: id },
			fields: ["id", "title", "slug", "content"],
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
				},
			},
		});

		const entity = results?.[0];

		if (!entity) {
			return ctx.notFound("Project not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},

	async find(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { results, pagination } = await strapi.service("api::project.project").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug"],
			populate: {
				cover: { fields: ["formats", "name", "width", "height", "url", "provider"] },
				services: {
					fields: ["title", "slug"],
					populate: {
						icon: {
							fields: ["name", "has_image"],
							populate: { image: { fields: ["formats", "name", "width", "height", "url", "provider"] } },
						},
					},
				},
			},
		});

		const sanitizedEntity = await this.sanitizeOutput(results, ctx);

		return this.transformResponse(sanitizedEntity, { pagination });
	},
}));

