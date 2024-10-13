export const getPlatformColor = (platformName) => {
	switch (platformName) {
		case "github":
			return "black";
		case "linkedin":
			return "blue-500";
		case "youtube":
			return "red-500";
		case "facebook":
			return "blue";
		case "instagram":
			return "purple";
		case "twitter":
			return "lightblue";
		default:
			return "grey";
	}
};
