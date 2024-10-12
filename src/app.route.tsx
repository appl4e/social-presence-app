import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { Links } from "./pages/links.page";
import { ProfileDetails } from "./pages/profile-details.page";

export const AppRoute = createBrowserRouter([
	{
		path: "",
		element: <AppLayout />,
		children: [
			{ path: "", element: <Navigate to="profile-details" /> },
			{ path: "profile-details", element: <ProfileDetails /> },
			{ path: "links", element: <Links /> },
		],
	},
	{},
]);
