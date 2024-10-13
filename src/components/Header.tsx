import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaLink, FaRegUserCircle } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { PreviewModal } from "./PreviewModal";

const pageRoutes = [
	{ path: "profile-details", label: "Profile Details", icon: <FaRegUserCircle /> },
	{ path: "links", label: "Links", icon: <FaLink /> },
];

export const Header = () => {
	const { pathname } = useLocation();
	const [opened, handlePreviewModal] = useDisclosure();

	console.log(pathname);
	return (
		<header className="flex items-center bg-white rounded-lg p-4 shadow-sm">
			<Link to="/">
				<img src="/images/logo.svg" alt="devLinks" className="hidden sm:inline-block" />
				<img src="/images/logo-m.svg" alt="devLinks" className="sm:hidden" />
			</Link>
			<div className="ms-auto shrink-0 flex items-center gap-x-4">
				{pageRoutes.map(({ path, label, icon }) => (
					<Link
						key={path}
						to={path}
						className={`flex items-center gap-x-3 px-6 h-[42px] font-semibold hover:bg-primary-light hover:text-primary rounded-md transition-all duration-500 ${
							pathname.includes(path) ? "text-primary bg-primary-light" : "text-muted"
						} `}
					>
						{icon}
						<span className="hidden sm:inline-flex">{label}</span>
					</Link>
				))}
				{/* <Link
					to="/"
					className="flex items-center gap-x-3 px-6 h-[42px] font-semibold hover:bg-primary-light hover:text-primary rounded-md transition-all duration-500 text-primary bg-primary-light "
				>
					<FaRegUserCircle />
					<span className="hidden sm:inline-flex">Profile Details</span>
				</Link>
				<Link
					to="/"
					className="flex items-center gap-x-3 px-6 h-[42px] font-semibold hover:bg-primary-light hover:text-primary rounded-md transition-all duration-500 text-muted "
				>
					<FaLink />
					<span className="hidden sm:inline-flex">Links</span>
				</Link> */}
			</div>

			<Button type="button" variant="outline" size="md" className="ms-auto" onClick={handlePreviewModal.open}>
				<FiEye className="sm:hidden" />
				<span className="hidden sm:inline-block">Preview</span>
			</Button>

			<PreviewModal isOpen={opened} onClose={handlePreviewModal.close} />
		</header>
	);
};
