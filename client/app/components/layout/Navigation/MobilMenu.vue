<script setup lang="ts">
const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

defineProps({
	isMenuOpen: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["close-menu"]);
</script>

<template>
	<transition
		enter-active-class="transition-all duration-500 ease-in overflow-hidden"
		enter-from-class="max-h-0"
		enter-to-class="max-h-[1000px]"
		leave-active-class="transition-all duration-500 ease-out overflow-hidden"
		leave-from-class="max-h-[1000px]"
		leave-to-class="max-h-0">
		<div
			v-if="isMenuOpen"
			id="mobile-menu"
			class="fixed top-24 lg:top-32 left-0 md:-left-14 w-full flex justify-center md:justify-end z-40 lg:hidden">
			<ul
				class="w-[90%] md:w-fit rounded-2xl flex flex-col transform-origin-top p-lg gap-md bg-light/10 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-xl">
				<li v-for="link in header?.links" :key="link.title" class="transition-opacity duration-500">
					<NuxtLink
						:to="link.url"
						@click="emit('close-menu')"
						class="block font-semibold text-lg text-center px-md py-xs">
						{{ link.title }}
					</NuxtLink>
				</li>
			</ul>
		</div>
	</transition>
</template>
