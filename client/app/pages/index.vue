<script setup lang="ts">
const pageStore = usePageStore();

const { data: pageData } = await useAsyncData("page", () => pageStore.fetchPage("home"), { server: true });

const page = useState("home-page", () => pageData.value);
</script>

<template>
	<div>{{ page?.title || "Home" }}</div>
</template>
