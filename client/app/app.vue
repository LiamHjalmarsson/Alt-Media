<script setup lang="ts">
const articleStore = useArticleStore();

const projectStore = useProjectStore();

const serviceStore = useServiceStore();

const pageStore = usePageStore();

projectStore.fetchProjects();

articleStore.fetchArticles();

serviceStore.fetchServices();

articleStore.fetchArticle("5-saker-att-taenka-pa-innan-du-bygger-en-ny-hemsida");

projectStore.fetchProject("modehuset");

serviceStore.fetchService("cms");

pageStore.fetchHomePage();
pageStore.fetchPage("om-oss");
</script>

<template>
	<NuxtLayout>
		<div>ss</div>
	</NuxtLayout>
</template>

