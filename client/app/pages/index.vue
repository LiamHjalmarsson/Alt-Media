<script setup lang="ts">
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import FeaturedArticles from "~/components/block/articles/FeaturedArticles.vue";
import type { Blocks } from "~/types/blocks";
import type { Page } from "~/types/collections/pages";

const { findOne } = useStrapi();

const { data: pageResponse } = await useAsyncData<Strapi5ResponseSingle<Page>>(
	"homePage",
	() => findOne("pages", "home"),
	{
		server: true,
	}
);

const page = computed(() => pageResponse.value?.data ?? null);

console.log(page.value);

const blocks = computed<Blocks[]>(() => page?.value?.blocks ?? []);

const componentMap: Record<string, any> = {
	"block.featured-articles": FeaturedArticles,
};
</script>

<template>
	<div>{{ page?.title || "Home" }}</div>

	<template v-for="(block, i) in blocks" :key="block.id ?? i">
		<component v-if="componentMap[block.__component]" :is="componentMap[block.__component]" :block="block" />
	</template>
</template>
