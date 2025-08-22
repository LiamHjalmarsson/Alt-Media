<script setup lang="ts">
const globalStore = useGlobalStore();

globalStore.fetchGlobal();
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
