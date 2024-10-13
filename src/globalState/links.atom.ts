import { atomWithStorage } from "jotai/utils";

interface Link {
	platform: string;
	link: string;
}

export const linksAtom = atomWithStorage<Link[]>("links", []);
