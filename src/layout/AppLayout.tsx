import { Header } from "@/components/Header";
import { PhonePreview } from "@/components/PhonePreview";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
	return (
		<div className="p-6 bg-background">
			<Header />
			<main className="py-6 md:grid grid-cols-12 gap-x-6">
				<div className="col-span-5 bg-white rounded-lg shadow-sm">
					<PhonePreview />
				</div>
				<div className="col-span-7 bg-white rounded-lg shadow-sm">
					<Outlet />
				</div>
			</main>
		</div>
	);
};
