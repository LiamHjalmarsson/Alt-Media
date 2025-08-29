<script setup lang="ts">
const articleStore = useArticleStore();

const servicesStore = useServiceStore();

const route = useRoute();

const router = useRouter();

const selected = ref<string | null>((route.query.service as string) ?? null);

await articleStore.fetchArticles();

await useAsyncData("articles", () => articleStore.fetchArticles(selected.value), { server: true, watch: [selected] });

await useAsyncData("services", () => servicesStore.fetchServices(), { server: true });

const { services } = storeToRefs(servicesStore);

const { articles } = storeToRefs(articleStore);

function onFilterCategory(title: string) {
	selected.value = selected.value === title ? null : title;

	router.push({ query: { service: selected.value || undefined } });
}
</script>

<template>
	<Section>
		<Container>
			<Heading title="Våra Artiklar" align-content="center" class="mt-2xl" />
			<Filter :services="services" :selected="selected" @filterByService="onFilterCategory" />
			<Grid class="grid-cols-3">
				<ArticleCard v-for="article in articles" :key="article.id" :article="article" />
			</Grid>
		</Container>
	</Section>
</template>
