import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Service } from "~/types/collections/services";

export const useServiceStore = defineStore("services", () => {
	const services = ref<Service[]>([]);

	const currentService = ref<Service>();

	const { find, findOne } = useStrapi();

	async function fetchServices(title?: string | null) {
		const params: any = {};

		if (title) {
			params.filters = {
				title: { $eqi: title },
			};
		}

		const result: Strapi5ResponseMany<Service> = await find<Service>("services", params);

		services.value = result.data || [];

		return services.value;
	}

	async function fetchService(id: string) {
		const result: Strapi5ResponseSingle<Service> = await findOne<Service>("services", id);

		currentService.value = result.data;

		return currentService.value;
	}

	return { services, currentService, fetchServices, fetchService };
});
