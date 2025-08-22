import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Project } from "~/types/collections/projects";

export const useProjectsStore = defineStore("projects", () => {
	const projects = ref<Project[]>([]);

	const currentProject = ref<Project>();

	const { find, findOne } = useStrapi();

	async function fetchProjects() {
		const result: Strapi5ResponseMany<Project> = await find<Project>("projects");

		projects.value = result.data || [];

		console.log(projects.value, "Projects");

		return projects.value;
	}

	async function fetchProject(id: string) {
		const result: Strapi5ResponseSingle<Project> = await findOne<Project>("projects", id);

		currentProject.value = result.data;

		console.log(currentProject.value, "Project");

		return currentProject.value;
	}

	return { projects, currentProject, fetchProjects, fetchProject };
});
