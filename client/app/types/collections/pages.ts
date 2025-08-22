import type { Blocks, HeroBlock } from "../blocks";

export interface Page {
	title: string;
	slug: string;
	blocks?: Blocks[];
}

export interface HomePage extends Page {
	hero: HeroBlock;
}
