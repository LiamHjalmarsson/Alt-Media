<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
	error: Object as () => NuxtError,
});
</script>

<template>
	<div class="h-screen flex justify-center items-center p-2xl">
		<div class="text-center container">
			<p class="font-bold text-primary text-[144px]">{{ error?.statusCode }}</p>
			<h1 class="text-heading-4xl font-bold mb-2xl">Detta är inte sidan du letar efter!</h1>
			<NuxtLink to="/" class="px-lg py-sm bg-primary font-bold text-lg text-white rounded-full"
				>Ta mig tillbaks</NuxtLink
			>
		</div>
	</div>
</template>
