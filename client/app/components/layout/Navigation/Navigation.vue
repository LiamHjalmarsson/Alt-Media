<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const isMenuOpen = ref(false);

const headerRef = ref<HTMLElement | null>(null);

const { theme } = useAutoHeaderContrast(headerRef);

function toggleMenu() {
	isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
	<header
		v-if="header"
		ref="headerRef"
		class="fixed p-lg z-50 w-full flex justify-center items-center"
		:class="theme === 'dark' ? 'text-light' : 'text-dark'">
		<div
			class="w-[80%] max-w-[1000px] px-md rounded-xl bg-light/10 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-xl">
			<nav class="flex items-center justify-between" aria-label="main navigation">
				<NuxtLink to="/" aria-label="Home">
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

				<BurgerMenu :is-menu-open="isMenuOpen" @toggle="toggleMenu" :theme />
			</nav>
		</div>
	</header>

	<Teleport to="body">
		<MobilMenu
			:is-menu-open="isMenuOpen"
			@close="isMenuOpen = false"
			:class="theme === 'dark' ? 'text-light' : 'text-dark'" />
	</Teleport>
</template>
