/**
 * service controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::service.service", ({ strapi }) => ({
	async findOne(ctx) {
		const { id } = ctx.params;

		const entity = await strapi.db.query("api::service.service").findOne({
			where: { slug: id },
			select: ["id", "title", "slug", "content", "description"],
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
		});

		if (!entity) {
			return ctx.notFound("Service not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},

	async find(ctx) {
		const entity = await strapi.db.query("api::service.service").findMany({
			select: ["id", "title", "slug", "description", "content"],
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
		});

		if (!entity) {
			return ctx.notFound("Articles not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

