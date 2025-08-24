import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import type { Ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRouter } from "vue-router";

extend([a11yPlugin]);

export type Theme = "light" | "dark";

const LUMINANCE_THRESHOLD = 0.5;

const RESIZE_DEBOUNCE_MS = 100;

export function useAutoHeaderContrast(headerRef: Ref<HTMLElement | null>) {
	const theme = ref<Theme>("dark");

	let scrollTrigger: ScrollTrigger | null = null;

	let resizeTimer: ReturnType<typeof setTimeout> | null = null;

	const router = useRouter();

	function updateTheme(): void {
		if (!headerRef.value) {
			return;
		}

		const rect = headerRef.value.getBoundingClientRect();

		const samplePoints = getSamplePoints(rect);

		const luminances = collectLuminances(samplePoints, headerRef.value);

		if (luminances.length === 0) {
			return;
		}

		const median = getMedian(luminances);

		if (median !== undefined) {
			theme.value = median < LUMINANCE_THRESHOLD ? "dark" : "light";
		}
	}

	function handleResize(): void {
		if (resizeTimer) {
			clearTimeout(resizeTimer);
		}

		resizeTimer = setTimeout(updateTheme, RESIZE_DEBOUNCE_MS);
	}

	onMounted(() => {
		if (typeof window === "undefined") {
			return;
		}

		gsap.registerPlugin(ScrollTrigger);

		scrollTrigger = ScrollTrigger.create({
			trigger: document.documentElement,
			start: "top top",
			end: "bottom bottom",
			onUpdate: updateTheme,
			onRefresh: updateTheme,
		});

		window.addEventListener("resize", handleResize, { passive: true });

		requestAnimationFrame(updateTheme);

		watch(
			() => router.currentRoute.value.fullPath,
			async () => {
				await nextTick();

				requestAnimationFrame(updateTheme);
			}
		);
	});

	onBeforeUnmount(() => {
		if (scrollTrigger) {
			scrollTrigger.kill();
		}

		if (resizeTimer) {
			clearTimeout(resizeTimer);
		}

		window.removeEventListener("resize", handleResize);
	});

	return { theme };
}

type Point = [number, number];

function getSamplePoints(rect: DOMRect, samplesPerLine = 5): Point[] {
	const verticals = [rect.top + rect.height * 0.25, rect.top + rect.height * 0.5, rect.top + rect.height * 0.75];

	const step = rect.width / (samplesPerLine + 1);

	const horizontals = Array.from({ length: samplesPerLine }, (_, i) => step * (i + 1));

	const points: Point[] = [];

	for (const y of verticals) {
		for (const offset of horizontals) {
			points.push([rect.left + offset, y]);
		}
	}

	return points;
}

function collectLuminances(points: Point[], header: HTMLElement): number[] {
	const luminances: number[] = [];

	const prevPointerEvents = header.style.pointerEvents;

	header.style.pointerEvents = "none";

	try {
		for (const [x, y] of points) {
			const target = document.elementFromPoint(x, y) as HTMLElement | null;

			if (!target) {
				continue;
			}

			const background = getBackgroundColor(target);

			if (!background) {
				continue;
			}

			const luminance = colord(background).luminance();
			luminances.push(luminance);
		}
	} finally {
		header.style.pointerEvents = prevPointerEvents;
	}

	return luminances;
}

function getBackgroundColor(element: HTMLElement): string | null {
	let current: HTMLElement | null = element;

	while (current) {
		const styles = getComputedStyle(current);

		if (styles.backgroundColor && styles.backgroundColor !== "rgba(0, 0, 0, 0)") {
			return styles.backgroundColor;
		}

		current = current.parentElement;
	}

	return getComputedStyle(document.body).backgroundColor || "#ffffff";
}

function getMedian(values: number[]): number | undefined {
	if (values.length === 0) {
		return undefined;
	}

	const sorted = [...values].sort((a, b) => a - b);

	return sorted[Math.floor(sorted.length / 2)];
}
