<script setup lang="ts">
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import FullSection from "~/components/block/fullSection/FullSection.vue";
import List from "~/components/block/list/list.vue";
import Solutions from "~/components/block/solution/Solutions.vue";
import type { Page } from "~/types/collections/pages";
import type { Blocks } from "~/types/blocks";
import Hero from "~/components/block/hero/Hero.vue";

const route = useRoute();

const { findOne } = useStrapi();

async function fetchPage() {
	const result: Strapi5ResponseSingle<Page> = await findOne<Page>("pages", "om-oss");

	return result.data;
}

const { data: dataResponse } = await useAsyncData("page", () => fetchPage(), { server: true });

const blocks = computed<Blocks[]>(() => dataResponse?.value?.blocks ?? []);

const componentMap: Record<string, any> = {
	"block.full-section": FullSection,
	"block.list": List,
	"block.solution": Solutions,
	"block.hero": Hero,
	// "block.info":
};
</script>

<template>
	<template v-for="block in blocks" :key="`${block.__component}-${block.id}`">
		<component v-if="componentMap[block.__component]" :is="componentMap[block.__component]" :block="block" />
	</template>
</template>
