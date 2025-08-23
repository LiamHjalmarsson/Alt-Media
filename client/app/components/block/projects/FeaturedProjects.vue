<script setup lang="ts">
import type { FeaturedProjectBlock } from "~/types/blocks";

const { block } = defineProps<{ block: FeaturedProjectBlock }>();
</script>

<template>
	<Section>
		<Container>
			<div class="flex justify-between items-center mb-sm md:mb-md lg:mb-lg xl:mb-xl">
				<Heading :title="block.title" />
				<ButtonLink variant="ghost" to="/projects">
					Våra Projekt <Icon name="material-symbols:arrow-forward" />
				</ButtonLink>
			</div>
			<ImageGallery>
				<ul
					v-for="project in block.projects"
					:key="project.id"
					class="flex-1 lg:hover:flex-[2] transition-all ease-in-out overflow-hidden rounded-xl shadow-2xl relative">
					<NuxtLink
						:to="`/projekt/${project.slug}`"
						class="flex justify-center items-center group h-[200px] md:h-[300px] lg:h-[400px] lg:max-lg:min-w-[350px] relative bg-bg-dark">
						<NuxtImg
							:src="project.cover.url"
							:alt="project.cover.alternativeText || ''"
							class="object-cover w-full h-full transition-all lg:group-hover:scale-105 lg:group-hover:opacity-35 lg:group-hover:blur-sm max-md:opacity-35" />

						<h3
							class="text-heading-lg font-semibold font-heading first-letter:capitalize absolute z-20 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-slow text-secondary">
							{{ project.title }}
						</h3>
					</NuxtLink>
				</ul>
			</ImageGallery>
		</Container>
	</Section>
</template>
