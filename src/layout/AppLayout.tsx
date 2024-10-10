import { Header } from "@/components/Header";
import { PhonePreview } from "@/components/PhonePreview";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
	return (
		<div className="p-6 bg-background">
			<Header />
			<main className="py-6 md:grid grid-cols-12 gap-x-24">
				<div className="col-span-5 bg-white rounded-lg">
					<PhonePreview />
				</div>
				<div className="col-span-7">
					<Outlet />
				</div>
			</main>
		</div>
	);
};
