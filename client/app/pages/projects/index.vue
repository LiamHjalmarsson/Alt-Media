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
	<Section data-header-color="light">
		<Container>
			<Heading title="Våra projekt" class="mt-2xl" align-content="center" />
			<Filter :services="services" :selected="selected" @filterByService="onFilterCategory" />
			<Grid class="grid-cols-3 gap-2xl">
				<NuxtLink
					v-for="project in projects"
					:key="project.id"
					:to="`/projekt/${project.slug}`"
					class="flex flex-col overflow-hidden bg-light group transition duration-300">
					<div class="h-56 overflow-hidden">
						<NuxtImg :src="project.cover.url" class="rounded-2xl object-cover h-full w-full" />
					</div>
					<div class="p-lg flex w-full justify-between items-center">
						<h3 class="font-semibold tracking-wide leading-relaxed">{{ project.title }}</h3>
						<div class="flex flex-wrap space-x-xs">
							<span v-for="service in project.services" :key="service.id" class="text-dark-gray text-sm">
								{{ service.title }}
							</span>
						</div>
					</div>
				</NuxtLink>
			</Grid>
		</Container>
	</Section>
</template>
