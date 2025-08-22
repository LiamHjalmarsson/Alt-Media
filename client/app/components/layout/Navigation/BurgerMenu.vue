<script setup lang="ts">
defineProps<{
	isMenuOpen: boolean;
}>();

const emit = defineEmits(["toggle"]);
</script>

<template>
	<button
		aria-label="Öppna meny"
		:aria-expanded="isMenuOpen"
		aria-controls="mobile-menu"
		class="p-xs space-y-2xs rounded-md z-50 cursor-pointer lg:hidden"
		@click="emit('toggle')">
		<span
			:class="[
				'block h-[3px] w-8 bg-light rounded transition-transform duration-300 ease-in-out',
				isMenuOpen ? 'rotate-45 translate-y-1' : '',
			]" />
		<span
			:class="[
				'block h-[3px] w-8 bg-light rounded transition-all duration-300 ease-in-out',
				isMenuOpen ? 'opacity-0 scale-0' : '',
			]" />
		<span
			:class="[
				'block h-[3px] w-8 bg-light rounded transition-transform duration-300 ease-in-out',
				isMenuOpen ? '-rotate-45 -translate-y-2.5' : '',
			]" />
	</button>
</template>
