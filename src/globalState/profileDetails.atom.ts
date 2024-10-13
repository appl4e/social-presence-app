import { atomWithStorage } from "jotai/utils";

interface ProfileDetails {
	firstName: string;
	lastName: string;
	email: string;
}

export const profileDetailsAtom = atomWithStorage<ProfileDetails | null>("profileDetails", null);
export const profileImageAtom = atomWithStorage<string | undefined>("profileImage", "");
