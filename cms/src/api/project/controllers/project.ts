/**
 * project controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::project.project", ({ strapi }) => ({
	async findOne(ctx) {
		const { id } = ctx.params;

		const entity = await strapi.db.query("api::project.project").findOne({
			where: { slug: id },
			select: ["id", "title", "slug", "content"],
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
			return ctx.notFound("Project not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},

	async find(ctx) {
		const entity = await strapi.db.query("api::project.project").findMany({
			select: ["id", "title", "slug"],
			populate: {
				cover: {
					select: ["formats", "name", "width", "height", "url", "provider"],
				},
				services: {
					select: ["title", "slug"],
				},
			},
		});

		if (!entity) {
			return ctx.notFound("Projects not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

