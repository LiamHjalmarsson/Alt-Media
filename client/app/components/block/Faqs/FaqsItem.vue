<script setup lang="ts">
import gsap from "gsap";
import type { ListItem } from "~/types/shared";

interface Faq {
	item: ListItem;
	number: number;
	activeId: number | null;
}

defineProps<Faq>();

const emit = defineEmits(["toggle"]);

function onToggle(id: number) {
	emit("toggle", id);
}

const prefersReduce = () => process.client && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function onEnter(element: Element, done: gsap.Callback) {
	const el = element as HTMLElement;

	if (prefersReduce()) {
		el.style.height = "auto";

		el.style.opacity = "1";

		done();

		return;
	}

	gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });

	const height = el.scrollHeight;

	gsap.to(el, {
		height: height,
		opacity: 1,
		duration: 0.35,
		ease: "power2.out",
		onComplete: () => {
			gsap.set(el, { height: "auto", clearProps: "overflow" });
			done();
		},
	});
}

function onLeave(element: Element, done: gsap.Callback) {
	const el = element as HTMLElement;

	if (prefersReduce()) {
		done();

		return;
	}

	gsap.set(el, { height: el.offsetHeight, overflow: "hidden" });

	gsap.to(el, {
		height: 0,
		opacity: 0,
		duration: 0.28,
		ease: "power2.in",
		onComplete: () => {
			done();
		},
	});
}
</script>

<template>
	<li
		@click="onToggle(item.id)"
		@keydown.enter.space="onToggle(item.id)"
		class="max-w-[750px] mx-auto mb-xl lg:mb-2xl overflow-hidden border border-dark/10 shadow-lg p-md rounded-lg cursor-pointer">
		<div class="flex items-center justify-between w-full">
			<span
				class="w-10 h-10 flex justify-center items-center text-heading-md lg:text-heading-lg font-semibold font-heading text-primary p-sm border border-primary bg-primary-disabled rounded-full">
				{{ number }}
			</span>
			<h4 class="text-heading-2xs md:text-heading-xs font-semibold flex-1 px-lg">
				{{ item.title }}
			</h4>
			<button
				:id="`faq-title-${item.id}`"
				class="text-left flex justify-between items-center focus:outline-none"
				:aria-expanded="activeId === item.id"
				:aria-controls="`faq-answer-${item.id}`"
				type="button">
				<Icon
					name="heroicons:chevron-down"
					:class="[
						'text-heading-xs transition-transform duration-300',
						activeId === item.id ? 'rotate-180' : '',
					]" />
			</button>
		</div>

		<div class="w-full">
			<Transition :css="false" @enter="onEnter" @leave="onLeave">
				<div
					v-show="activeId === item.id"
					:id="`faq-answer-${item.id}`"
					class="overflow-hidden mt-sm px-2xs"
					:aria-labelledby="`faq-title-${item.id}`">
					<p class="text-md">
						{{ item.description }}
					</p>
				</div>
			</Transition>
		</div>
	</li>
</template>
