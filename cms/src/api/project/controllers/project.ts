/**
 * project controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::project.project", ({ strapi }) => ({
	async findOne(ctx) {
		const { id } = ctx.params;

		const entity = await strapi.db.query("api::project.project").findOne({
			where: { slug: id },
		});

		if (!entity) {
			return ctx.notFound("Project not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

