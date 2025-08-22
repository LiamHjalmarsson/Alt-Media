import type { Image } from "../shared";
import type { Service } from "./services";

export interface Project {
	id: number;
	title: string;
	slug: string;
	cover: Image;
	content: string;
	services: Service[];
}
