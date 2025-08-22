/**
 * page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::page.page", ({ strapi }) => ({
	async findOne(ctx) {
		const { id } = ctx.params;

		const entity = await strapi.db.query("api::page.page").findOne({
			where: { slug: id },
		});

		if (!entity) {
			return ctx.notFound("Page not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

