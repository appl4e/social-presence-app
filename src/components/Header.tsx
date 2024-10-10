import { Button } from "@mantine/core";
import { FaLink, FaRegUserCircle } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<header className="flex items-center bg-white rounded-lg p-4 shadow-sm">
			<Link to="/">
				<img src="/images/logo.svg" alt="devLinks" className="hidden sm:inline-block" />
				<img src="/images/logo-m.svg" alt="devLinks" className="sm:hidden" />
			</Link>
			<div className="ms-auto shrink-0 flex items-center gap-x-4">
				<Link
					to="/"
					className="flex items-center gap-x-3 text-primary bg-primary-light font-semibold px-6 h-[42px]  hover:bg-primary-light hover:text-primary rounded-md  duration-500"
				>
					<FaRegUserCircle />
					<span className="hidden sm:inline-flex">Profile Details</span>
				</Link>
				<Link
					to="/"
					className="flex items-center gap-x-3 text-muted px-6 h-[42px] font-semibold hover:bg-primary-light hover:text-primary rounded-md transition-all duration-500"
				>
					<FaLink />
					<span className="hidden sm:inline-flex">Links</span>
				</Link>
			</div>

			<Button type="button" variant="outline" size="md" className="ms-auto">
				<FiEye className="sm:hidden" />
				<span className="hidden sm:inline-block">Preview</span>
			</Button>
		</header>
	);
};
