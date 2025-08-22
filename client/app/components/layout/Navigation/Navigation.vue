<script setup lang="ts">
import { ref } from "vue";

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const isMenuOpen = ref(false);

const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
</script>

<template>
	<header
		class="fixed px-md z-50 top-4 left-0 right-0 w-[80%] max-w-[1200px] shadow-2xl border-dark/5 mx-auto backdrop-blur-2xl rounded-xl"
		v-if="header">
		<nav class="flex justify-between items-center" aria-label="main navigation">
			<NuxtLink to="/" aria-label="Hem" class="min-w-[136px]">
				<NuxtImg
					:src="header?.logo.url"
					width="120"
					height="80"
					format="webp"
					quality="80"
					class="h-16 w-auto" />
			</NuxtLink>

			<NavigationLinks />

			<BurgerMenu :isMenuOpen @toggle="toggleMenu" />
		</nav>
	</header>

	<Teleport to="body">
		<MobilMenu :isMenuOpen @close="isMenuOpen = false" />
	</Teleport>
</template>
