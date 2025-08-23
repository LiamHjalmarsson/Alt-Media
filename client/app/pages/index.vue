<script setup lang="ts">
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import FeaturedArticles from "~/components/block/articles/FeaturedArticles.vue";
import Hero from "~/components/block/hero/Hero.vue";
import type { Blocks } from "~/types/blocks";
import type { HomePage } from "~/types/collections/pages";

const { findOne } = useStrapi();

const { data: pageResponse } = await useAsyncData<Strapi5ResponseSingle<HomePage>>(
	"home-page",
	() => findOne("home-page"),
	{ server: true }
);

const page = computed(() => pageResponse.value?.data ?? null);

console.log(page.value);

const blocks = computed<Blocks[]>(() => page?.value?.blocks ?? []);

const componentMap: Record<string, any> = {
	"block.featured-articles": FeaturedArticles,
};
</script>

<template>
	<Hero v-if="page?.hero" :block="page.hero" class="min-h-screen">
		<div class="flex justify-end items-center relative max-lg:hidden">
			<div
				class="absolute -top-6 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
				style="
					background: conic-gradient(
						from 0deg,
						rgba(99, 102, 241, 0.28),
						rgba(56, 189, 248, 0.28),
						rgba(16, 185, 129, 0.28),
						rgba(99, 102, 241, 0.28)
					);
				"></div>
			<FormCard class="sm:w-[480px] max-lg:hidden">
				<h3 class="text-heading-md text-light font-bold">Påbörja projekt</h3>

				<p class="my-md text-md text-light-gray">
					Berätta för oss vad du behöver och vi återkommer inom 24 timmar
				</p>

				<form class="space-y-lg">
					<Grid class="grid-cols-2" gap="xl">
						<FormField label="Namn">
							<Input id="" name="" placeholder="" />
						</FormField>
						<FormField label="Email">
							<Input id="" name="" type="email" placeholder="" />
						</FormField>
					</Grid>

					<FormField label="Välj tjänster">
						<Select id="" name=""> </Select>
					</FormField>

					<FormField label="Brief">
						<Textarea id="" name="" rows="" placeholder="" />
					</FormField>

					<Button type="submit" class="w-1/2"> Skicka förfrågan </Button>
				</form>
			</FormCard>
		</div>
	</Hero>

	<template v-for="block in blocks" :key="`${block.__component}-${block.id}`">
		<component v-if="componentMap[block.__component]" :is="componentMap[block.__component]" :block="block" />
	</template>
</template>
