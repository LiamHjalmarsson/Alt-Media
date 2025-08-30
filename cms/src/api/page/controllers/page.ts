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
								links: {
									fields: ["label", "url", "variant"],
								},
							},
						},
						"block.list": {
							populate: {
								fields: ["id", "title"],
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
						"block.info": {
							populate: {
								fields: ["id", "title", "align_content"],
								image: {
									populate: {
										fields: ["formats", "name", "width", "height", "url", "provider"],
									},
								},
								button: {
									fields: ["label", "url", "variant"],
								},
								link: {
									fields: ["label", "url", "variant"],
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
									fields: ["label", "url", "variant"],
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

