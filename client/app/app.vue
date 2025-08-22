<script setup lang="ts">
const articleStore = useArticlesStore();

articleStore.fetchArticles();

articleStore.fetchArticle("5-saker-att-taenka-pa-innan-du-bygger-en-ny-hemsida");
</script>

<template>
	<NuxtLayout>
		<div>ss</div>
	</NuxtLayout>
</template>

