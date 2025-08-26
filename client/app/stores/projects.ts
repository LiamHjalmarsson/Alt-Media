import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Project } from "~/types/collections/projects";

export const useProjectStore = defineStore("projects", () => {
	const projects = ref<Project[]>([]);

	const currentProject = ref<Project>();

	const { find, findOne } = useStrapi();

	async function fetchProjects(service?: string | null) {
		// Will be changed
		const params: any = {};

		if (service) {
			params.filters = {
				services: {
					title: { $eqi: service },
				},
			};
		}

		const result: Strapi5ResponseMany<Project> = await find<Project>("projects", params);

		projects.value = result.data || [];

		return projects.value;
	}

	async function fetchProject(id: string) {
		const result: Strapi5ResponseSingle<Project> = await findOne<Project>("projects", id);

		currentProject.value = result.data;

		return currentProject.value;
	}

	return { projects, currentProject, fetchProjects, fetchProject };
});
