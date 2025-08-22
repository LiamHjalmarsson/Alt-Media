<script setup lang="ts">
const articleStore = useArticlesStore();

const projectStore = useProjectsStore();

projectStore.fetchProjects();

articleStore.fetchArticles();

articleStore.fetchArticle("5-saker-att-taenka-pa-innan-du-bygger-en-ny-hemsida");

projectStore.fetchProject("modehuset");
</script>

<template>
	<NuxtLayout>
		<div>ss</div>
	</NuxtLayout>
</template>

