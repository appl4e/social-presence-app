import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
	return (
		<div className="p-6 bg-background">
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
};
