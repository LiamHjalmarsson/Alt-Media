<script setup lang="ts">
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
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
</script>

<template>
	<div>{{ page?.title || "Home" }}</div>
</template>
