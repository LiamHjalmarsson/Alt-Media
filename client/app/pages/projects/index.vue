<script setup lang="ts">
const projectsStore = useProjectStore();

const servicesStore = useServiceStore();

const route = useRoute();

const router = useRouter();

const selected = ref<string | null>((route.query.service as string) ?? null);

await useAsyncData("projects", () => projectsStore.fetchProjects(selected.value), {
	server: true,
	watch: [selected],
});

await useAsyncData("services", () => servicesStore.fetchServices(), { server: true });

const { projects } = storeToRefs(projectsStore);

const { services } = storeToRefs(servicesStore);

function onFilterCategory(title: string) {
	selected.value = selected.value === title ? null : title;

	router.push({ query: { service: selected.value || undefined } });
}
</script>

<template>
	<Section>
		<Container>
			<Heading title="Våra projekt" class="mt-2xl" align-content="center" />

			<Filter :services="services" :selected="selected" @filterByService="onFilterCategory" />

			<Grid class="grid-cols-3 gap-2xl">
				<ProjectCard v-for="project in projects" :key="project.id" :project="project" />
			</Grid>
		</Container>
	</Section>
</template>
