<script setup lang="ts">
import type { BlockNode } from "#strapi-blocks-renderer/types";

const articleStore = useArticleStore();

const route = useRoute();

await useAsyncData("article", () => articleStore.fetchArticle(route.params.slug as string), { server: true });

const { currentArticle } = storeToRefs(articleStore);

const blockNodes = computed<BlockNode[]>(() => {
	const description = currentArticle.value?.description;

	return Array.isArray(description) ? (description as BlockNode[]) : [];
});
</script>

<template>
	<Section class="relative h-[35vh] min-h-[350px]">
		<NuxtImg
			v-if="currentArticle?.cover?.url"
			:src="currentArticle.cover.url"
			class="absolute inset-0 w-full h-full object-cover" />
		<div class="absolute inset-0 bg-black/50" />
		<Container class="relative h-full flex flex-col justify-end">
			<h1 class="text-heading-3xl font-extrabold text-secondary tracking-tight">
				{{ currentArticle?.title }}
			</h1>
			<div v-if="currentArticle?.services" class="flex">
				<NuxtLink
					v-for="service in currentArticle.services"
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

					<StrapiBlocksText :nodes="blockNodes" />
				</div>

				<aside>
					<h3 class="text-heading-lg font-bold mb-sm mt-xs">Vad vi gjort</h3>

					<ol class="space-y-md grow">
						<li
							v-for="(service, i) in currentArticle?.services ?? []"
							:key="service.id"
							class="flex items-center">
							<span
								class="w-8 h-8 flex justify-center items-center text-heading-md font-semibold font-heading text-primary p-sm border border-primary bg-primary-disabled rounded-full">
								{{ i + 1 }}
							</span>
							<span class="text-heading-md font-medium ml-md first-letter:capitalize">
								{{ service.title }}
							</span>
						</li>
					</ol>
				</aside>
			</Grid>
		</Container>
	</Section>
</template>
