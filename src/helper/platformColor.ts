export const getPlatformColor = (platformName) => {
	switch (platformName) {
		case "github":
			return "bg-black";
		case "linkedin":
			return "bg-sky-800";
		case "youtube":
			return "bg-red-500";
		case "facebook":
			return "bg-blue-600";
		default:
			return "grey";
	}
};
