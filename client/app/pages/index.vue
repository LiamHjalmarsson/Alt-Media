<script setup lang="ts">
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import FeaturedArticles from "~/components/block/articles/FeaturedArticles.vue";
import Faqs from "~/components/block/faqs/Faqs.vue";
import FullSection from "~/components/block/fullSection/FullSection.vue";
import List from "~/components/block/list/list.vue";
import FeaturedProjects from "~/components/block/projects/FeaturedProjects.vue";
import FeaturedServices from "~/components/block/services/FeaturedServices.vue";
import Solutions from "~/components/block/solution/Solutions.vue";
import type { Blocks } from "~/types/blocks";
import type { HomePage } from "~/types/collections/pages";

const { findOne } = useStrapi();

const { data: dataResponse } = await useAsyncData<Strapi5ResponseSingle<HomePage>>(
	"home-page",
	() => findOne("home-page"),
	{ server: true }
);

const page = computed(() => dataResponse.value?.data ?? null);

const blocks = computed<Blocks[]>(() => page?.value?.blocks ?? []);

const componentMap: Record<string, any> = {
	"block.featured-articles": FeaturedArticles,
	"block.featured-projects": FeaturedProjects,
	"block.featured-services": FeaturedServices,
	"block.faq": Faqs,
	"block.full-section": FullSection,
	"block.list": List,
	"block.solution": Solutions,
};
</script>

<template>
	<Hero v-if="page?.hero" :block="page.hero" class="min-h-screen">
		<div class="flex justify-end items-center relative max-lg:hidden">
			<div
				class="absolute -top-6 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-full opacity-50 blur-3xl gradient-ring"></div>

			<FormCard v-if="page.hero.form" class="sm:w-[480px] max-lg:hidden">
				<h3 class="text-heading-md text-light font-bold">{{ page.hero.form.title }}</h3>

				<p class="my-md text-md text-light-gray">
					{{ page.hero.form.description }}
				</p>

				<form class="space-y-lg">
					<Grid class="grid-cols-2" gap="xl" v-if="page.hero.form.input">
						<FormField v-for="input in page.hero.form.input" :key="input.name" :label="input.label">
							<Input id="" name="" placeholder="" />
						</FormField>
					</Grid>

					<FormField
						v-if="page.hero.form.select"
						v-for="select in page.hero.form.select"
						:key="select.name"
						:label="select.label">
						<Select id="" name="">
							<option v-for="option in select.options" :key="option">{{ option }}</option>
						</Select>
					</FormField>

					<FormField
						v-if="page.hero.form.textarea"
						v-for="select in page.hero.form.textarea"
						:key="select.name"
						:label="select.label">
						<Textarea id="" name="" rows="" placeholder="" />
					</FormField>

					<Button type="submit" class="w-1/2"> {{ page.hero.form.button?.label }} </Button>
				</form>
			</FormCard>
		</div>
	</Hero>

	<template v-for="block in blocks" :key="`${block.__component}-${block.id}`">
		<component v-if="componentMap[block.__component]" :is="componentMap[block.__component]" :block="block" />
	</template>
</template>
