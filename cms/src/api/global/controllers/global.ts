/**
 * global controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::global.global", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.db.query("api::global.global").findOne({
			select: ["id", "site_name"],
			populate: {
				favicon: {
					select: ["formats", "name", "width", "height", "url", "provider"],
				},
				navigation: {
					populate: {
						links: {
							select: ["title", "url"],
						},
						logo: {
							select: ["formats", "name", "width", "height", "url", "provider"],
						},
					},
				},
				footer: {
					select: ["title", "description"],
					populate: {
						button: {
							select: ["label", "url", "type", "variant"],
						},
						footer_column: {
							select: ["title", "url"],
							populate: {
								links: {
									select: ["label", "url", "type", "variant"],
								},
							},
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

