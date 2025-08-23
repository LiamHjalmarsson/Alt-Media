/**
 * global controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::global.global", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.service("api::global.global").find({
			fields: ["id", "site_name"],
			populate: {
				favicon: {
					fields: ["formats", "name", "width", "height", "url", "provider"],
				},
				navigation: {
					populate: {
						links: {
							fields: ["title", "url"],
						},
						logo: {
							fields: ["formats", "name", "width", "height", "url", "provider"],
						},
					},
				},
				footer: {
					fields: ["title", "description"],
					populate: {
						button: {
							fields: ["label", "url", "type", "variant"],
						},
						footer_column: {
							fields: ["title", "url"],
							populate: {
								links: {
									fields: ["label", "url", "type", "variant"],
								},
							},
						},
					},
				},
				seo: {
					fields: ["meta_title", "meta_description", "meta_cannical_url", "prevent_index"],
					populate: {
						meta_image: {
							fields: ["formats", "name", "width", "height", "url", "provider"],
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

