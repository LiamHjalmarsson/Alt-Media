/**
 * page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::page.page", ({ strapi }) => ({
	async findOne(ctx) {
		const { id } = ctx.params;

		const entity = await strapi.db.query("api::page.page").findOne({
			where: { slug: id },
			select: ["id", "title", "slug"],
			populate: {
				blocks: {
					on: {
						"block.hero": {
							populate: {
								select: ["__component", "id", "title", "colored_title", "description"],
								cover: {
									populate: {
										select: ["formats", "name", "width", "height", "url", "provider"],
									},
								},
								buttons: {
									select: ["label", "url", "type", "variant"],
								},
							},
						},
						"block.list": {
							populate: {
								select: ["__component", "id", "title"],
								button: {
									select: ["label", "url", "type", "variant"],
								},
								items: {
									select: ["title", "description"],
								},
							},
						},
						"block.info": {
							populate: {
								select: ["__component", "id", "title", "align_content"],
								cover: {
									populate: {
										select: ["formats", "name", "width", "height", "url", "provider"],
									},
								},
								button: {
									select: ["label", "url", "type", "variant"],
								},
							},
						},
						"block.full-section": {
							populate: {
								select: ["__component", "id", "title", "description"],
								cover: {
									populate: {
										select: ["formats", "name", "width", "height", "url", "provider"],
									},
								},
								link: {
									select: ["label", "url", "type", "variant"],
								},
							},
						},
						"block.faq": {
							populate: {
								select: ["__component", "id", "title"],
								items: {
									select: ["title", "description"],
								},
							},
						},
						"block.featured-services": {
							populate: {
								select: ["__component", "id", "title"],
								services: {
									select: ["title", "slug", "description"],
									populate: {
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
						},
						"block.featured-articles": {
							populate: {
								select: ["__component", "id", "title"],
								articles: {
									select: ["title", "slug", "description"],
									populate: {
										cover: {
											select: ["formats", "name", "width", "height", "url", "provider"],
										},
									},
								},
							},
						},
						"block.featured-projects": {
							populate: {
								select: ["__component", "id", "title"],
								projects: {
									select: ["title", "slug"],
									populate: {
										cover: {
											select: ["formats", "name", "width", "height", "url", "provider"],
										},
									},
								},
							},
						},
					},
				},
			},
		});

		if (!entity) {
			return ctx.notFound("Page not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

