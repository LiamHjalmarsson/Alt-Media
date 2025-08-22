import type { Blocks } from "../blocks";

export interface Page {
	title: string;
	slug: string;
	blocks?: Blocks[];
}
