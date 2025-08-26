import type { Image } from "../shared";
import type { Service } from "./services";
import type { BlockNode } from "#strapi-blocks-renderer/types";

export interface Project {
	id: number;
	title: string;
	slug: string;
	cover: Image;
	content?: BlockNode[];
	services: Service[];
}
