/**
 * sub-service controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::sub-service.sub-service", ({ strapi }) => ({
	async findOne(ctx) {
		const { id } = ctx.params;

		const entity = await strapi.db.query("api::sub-service.sub-service").findOne({
			where: { slug: id },
		});

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

