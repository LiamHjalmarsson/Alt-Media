<script setup lang="ts">
import type { FeaturedArticle } from "~/types/collections/articles";

const { article } = defineProps<{ article: FeaturedArticle }>();

const slug = computed(() => `/articles/${article.slug}`);
</script>

<template>
	<NuxtLink
		:to="slug"
		:aria-label="`Läs artikel: ${article.title}`"
		class="flex flex-col overflow-hidden rounded-2xl bg-light group transition duration-300 shadow-md hover:shadow-lg hover:bg-dark-light">
		<div class="h-56 overflow-hidden">
			<NuxtImg
				:src="article.cover.url"
				alt=""
				loading="lazy"
				densities="x1 x2"
				class="h-full w-full object-cover group-hover:scale-105 transition transform duration-300" />
		</div>

		<div class="flex flex-col flex-1 p-lg">
			<h3 class="text-lg font-bold text-dark duration-300 group-hover:text-primary line-clamp-2">
				{{ article.title }}
			</h3>

			<p v-if="article.description" class="mt-xs text-sm text-dark-gray line-clamp-3">
				{{ article.description }}
			</p>

			<div class="mt-auto flex items-center justify-between pt-sm">
				<div class="text-xs text-dark-gray">
					<span v-if="article.date">{{ article.date }}</span>
				</div>

				<Button variant="ghost" class="text-sm"> Läs mer </Button>
			</div>
		</div>
	</NuxtLink>
</template>
