import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { ProfileDetails } from "./pages/profile-details.page";

export const AppRoute = createBrowserRouter([
	{
		path: "",
		element: <AppLayout />,
		children: [{ path: "", element: <ProfileDetails /> }],
	},
	{},
]);
