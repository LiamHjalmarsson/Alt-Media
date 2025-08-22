<script setup lang="ts">
const globalStore = useGlobalStore();

const { globalSettings, seo } = storeToRefs(globalStore);

await useAsyncData("global", () => globalStore.fetchGlobal(), { server: true });

useHead({
	title: globalSettings.value?.site_name,

	htmlAttrs: { lang: "sv" },

	link: [
		{
			rel: "icon",
			type: "image/x-icon",
			href: globalSettings.value?.favicon.url,
		},
	],
});

useSeoMeta({
	description: seo.value?.meta_description,

	ogTitle: seo.value?.meta_title,
	ogDescription: seo.value?.meta_description,
	ogImage: seo.value?.meta_image.url,
	ogUrl: seo.value?.meta_cannical_url,

	twitterTitle: seo.value?.meta_title,
	twitterDescription: seo.value?.meta_description,
	twitterImage: seo.value?.meta_image.url,
	twitterCard: "summary_large_image",
});
</script>

<template>
	<div class="min-h-screen flex flex-col">
		<!-- <Header /> -->

		<main class="grow">
			<slot />
		</main>

		<!-- <Footer /> -->
	</div>
</template>
