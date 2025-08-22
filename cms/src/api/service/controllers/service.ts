/**
 * service controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::service.service", ({ strapi }) => ({
	async findOne(ctx) {
		const { id } = ctx.params;

		const entity = await strapi.db.query("api::service.service").findOne({
			where: { slug: id },
		});

		if (!entity) {
			return ctx.notFound("Service not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

