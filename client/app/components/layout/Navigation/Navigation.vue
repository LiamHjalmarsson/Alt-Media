<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const isMenuOpen = ref(false);

const headerRef = ref<HTMLElement | null>(null);

const { theme } = useAutoHeaderContrast(headerRef);

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
	<header
		v-if="header"
		ref="headerRef"
		class="fixed top-4 left-0 right-0 z-50 w-[80%] max-w-[1000px] px-md mx-auto rounded-xl transition duration-300 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-xl"
		:class="[theme === 'dark' ? 'text-light' : 'text-dark']">
		<nav class="flex justify-between items-center" aria-label="main navigation">
			<NuxtLink to="/" aria-label="Home" class="min-w-[136px]">
				<NuxtImg
					:src="header?.logo.url"
					width="120"
					height="80"
					format="webp"
					quality="80"
					class="h-16 w-auto"
					alt="Site logo" />
			</NuxtLink>

			<NavigationLinks />
			<BurgerMenu :is-menu-open="isMenuOpen" @toggle="toggleMenu" />
		</nav>
	</header>

	<Teleport to="body">
		<MobilMenu :is-menu-open="isMenuOpen" @close="isMenuOpen = false" />
	</Teleport>
</template>
