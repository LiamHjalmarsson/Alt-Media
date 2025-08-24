<script setup lang="ts">
const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);
</script>

<template>
	<ul class="flex items-center max-lg:hidden space-x-md">
		<li v-for="link in header?.links" :key="link.title" class="relative group px-md py-xxs cursor-pointer">
			<NuxtLink :to="`/${link.url}`" class="font-semibold text-sm">
				{{ link.title }}
				<span
					class="absolute left-0 bottom-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500" />
			</NuxtLink>
		</li>
	</ul>
</template>
