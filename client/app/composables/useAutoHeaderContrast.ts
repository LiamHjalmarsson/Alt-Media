import { ref, onMounted, onBeforeUnmount, nextTick, type Ref } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";

extend([a11yPlugin]);

export type Theme = "light" | "dark";

const LUMINANCE_THRESHOLD = 0.5;

const RESIZE_DEBOUNCE_MS = 100;

const NAV_RETRY_DELAYS = [0, 50, 150, 400, 1000];

export function useAutoHeaderContrast(headerRef: Ref<HTMLElement | null>) {
	const theme = ref<Theme>("dark");

	let scrollTrigger: ScrollTrigger | null = null;

	let resizeTimer: ReturnType<typeof setTimeout> | null = null;

	let navRetryTimers: ReturnType<typeof setTimeout>[] = [];

	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	let mutationObserver: MutationObserver | null = null;

	const imageLoadListeners: Array<{ img: HTMLImageElement; handler: EventListener }> = [];

	const router = useRouter();

	function getMedian(values: number[]): number | undefined {
		if (!values.length) {
			return undefined;
		}

		const sorted = [...values].sort((a, b) => a - b);

		return sorted[Math.floor(sorted.length / 2)];
	}

	function getBackgroundColor(element: HTMLElement | null): string | null {
		let current: HTMLElement | null = element;

		while (current) {
			const styles = getComputedStyle(current);

			const bg = styles.backgroundColor;

			if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;

			current = current.parentElement;
		}

		const bodyBg = getComputedStyle(document.body).backgroundColor;

		return bodyBg || "#ffffff";
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

				if (!target) continue;
				const background = getBackgroundColor(target);

				if (!background) continue;

				luminances.push(colord(background).luminance());
			}
		} finally {
			header.style.pointerEvents = prevPointerEvents;
		}

		return luminances;
	}

	function updateTheme(): void {
		if (!headerRef.value) {
			return;
		}

		const rect = headerRef.value.getBoundingClientRect();

		const samplePoints = getSamplePoints(rect);

		const luminances = collectLuminances(samplePoints, headerRef.value);

		if (!luminances.length) {
			return;
		}

		const median = getMedian(luminances);

		if (median !== undefined) {
			theme.value = median < LUMINANCE_THRESHOLD ? "dark" : "light";
		}
	}

	function updateThemeFromHeroOrBody(): void {
		const hero = document.querySelector<HTMLElement>(".hero");

		const base = hero ?? document.body;

		const bg = getBackgroundColor(base);

		if (!bg) {
			return;
		}

		theme.value = colord(bg).luminance() < LUMINANCE_THRESHOLD ? "dark" : "light";
	}

	function scheduleDebouncedUpdateTheme() {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			updateThemeFromHeroOrBody();
			updateTheme();
			try {
				(ScrollTrigger as any).refresh?.();
			} catch {}
		}, 50);
	}

	function clearNavRetries() {
		for (const t of navRetryTimers) {
			clearTimeout(t);
		}

		navRetryTimers = [];
	}

	function scheduleNavChecks() {
		clearNavRetries();

		for (const d of NAV_RETRY_DELAYS) {
			const t = setTimeout(() => {
				updateThemeFromHeroOrBody();

				updateTheme();

				(ScrollTrigger as any).refresh?.();
			}, d);

			navRetryTimers.push(t);
		}
	}

	function observeHeroAndImages() {
		if (mutationObserver) {
			mutationObserver.disconnect();

			mutationObserver = null;
		}

		for (const { img, handler } of imageLoadListeners) {
			img.removeEventListener("load", handler);
		}

		imageLoadListeners.length = 0;

		const hero =
			document.querySelector<HTMLElement>(".hero") ??
			document.querySelector<HTMLElement>("main") ??
			document.body;

		if (!hero) {
			return;
		}

		mutationObserver = new MutationObserver(() => scheduleDebouncedUpdateTheme());

		mutationObserver.observe(hero, { attributes: true, childList: true, subtree: true });

		const imgs = Array.from(hero.querySelectorAll<HTMLImageElement>("img"));

		for (const img of imgs) {
			if (!img.complete) {
				const handler = () => {
					updateThemeFromHeroOrBody();

					updateTheme();

					(ScrollTrigger as any).refresh?.();
				};
				img.addEventListener("load", handler);

				imageLoadListeners.push({ img, handler });
			}
		}
	}

	function handleResize(): void {
		if (resizeTimer) {
			clearTimeout(resizeTimer);
		}

		resizeTimer = setTimeout(() => {
			updateThemeFromHeroOrBody();

			updateTheme();

			(ScrollTrigger as any).refresh?.();
		}, RESIZE_DEBOUNCE_MS);
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

		requestAnimationFrame(() => {
			updateThemeFromHeroOrBody();

			updateTheme();

			observeHeroAndImages();
		});

		router.afterEach(() => {
			nextTick().then(() => {
				requestAnimationFrame(() => {
					scheduleNavChecks();

					observeHeroAndImages();
				});
			});
		});
	});

	onBeforeUnmount(() => {
		if (scrollTrigger) {
			try {
				scrollTrigger.kill();
			} catch {}
			scrollTrigger = null;
		}

		if (resizeTimer) {
			clearTimeout(resizeTimer);
		}

		clearNavRetries();

		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		if (mutationObserver) {
			mutationObserver.disconnect();
		}

		for (const { img, handler } of imageLoadListeners) {
			img.removeEventListener("load", handler);
		}

		window.removeEventListener("resize", handleResize);
	});

	return { theme };
}
