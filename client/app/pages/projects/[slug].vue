<script setup lang="ts">
import type { BlockNode } from "#strapi-blocks-renderer/types";

const projectsStore = useProjectStore();

const route = useRoute();

await useAsyncData("project", () => projectsStore.fetchProject(route.params.slug as string), { server: true });

const { currentProject } = storeToRefs(projectsStore);

const content: BlockNode[] = currentProject.value?.content || [];

const uniqueSubservices = computed(() => {
	if (!currentProject.value?.services) return [];

	const all = currentProject.value.services.flatMap((s) =>
		(s.sub_services || []).map((sub) => ({ ...sub, serviceSlug: s.slug }))
	);

	const map = new Map(all.map((sub) => [sub.id, sub]));

	return [...map.values()];
});
</script>

<template>
	<Section class="relative h-[35vh] min-h-[350px]">
		<NuxtImg
			v-if="currentProject?.cover?.url"
			:src="currentProject.cover.url"
			class="absolute inset-0 w-full h-full object-cover" />
		<div class="absolute inset-0 bg-black/50" />
		<Container class="relative h-full flex flex-col justify-end">
			<h1 class="text-heading-3xl font-extrabold text-secondary tracking-tight">
				{{ currentProject?.title }}
			</h1>
			<div v-if="currentProject?.services" class="flex">
				<NuxtLink
					v-for="service in currentProject.services"
					:key="service.id"
					:to="`/services/${service.slug}`"
					class="text-light font-semibold texct-heading-sm px-sm">
					{{ service.title }}
				</NuxtLink>
			</div>
		</Container>
	</Section>

	<Section>
		<Container>
			<Grid class="md:grid-cols-3">
				<div class="md:col-span-2 pr-2xl">
					<h2 class="text-heading-xl font-bold mb-sm">Om projektet</h2>

					<div v-if="currentProject?.content" class="text-body-lg leading-relaxed">
						<StrapiBlocksText :nodes="content" />
					</div>

					<p v-else class="text-body-lg leading-relaxed text-dark-gray">Beskrivning saknas.</p>
				</div>

				<aside>
					<h3 class="text-heading-lg font-bold mb-sm mt-xs">Vad vi gjort</h3>
					<ol class="space-y-md grow">
						<li v-for="(sub, i) in uniqueSubservices" :key="sub.id" class="font-semibold">
							<NuxtLink :to="`/services/${sub.serviceSlug}`" class="flex items-center">
								<span
									class="w-6 h-6 flex justify-center items-center text-heading-sm font-semibold font-heading text-primary p-sm border border-primary bg-primary-disabled rounded-full">
									{{ i + 1 }}
								</span>
								<span class="text-heading-xs font-medium ml-md first-letter:capitalize truncate">
									{{ sub.title }}
								</span>
							</NuxtLink>
						</li>
					</ol>
				</aside>
			</Grid>
		</Container>
	</Section>
</template>
