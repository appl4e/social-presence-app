import { FiArrowRight } from "react-icons/fi";
import { ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { TbBrandGithubFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

export const PhonePreview = () => {
	return (
		<div className="flex items-center justify-center py-[102px]">
			<div className="phone-bg px-[36px] py-[70px]">
				<div className="rounded-full bg-muted border-[3px] border-primary size-[105px] overflow-hidden flex items-center justify-center mx-auto">
					<img src="/images/profile.png" alt="Profile Pic" className="size-full" />
				</div>
				<h3 className="text-center mt-6 font-semibold text-xl">Ben Wright</h3>
				<p className="text-muted text-sm text-center mt-2">ben@example.com</p>

				<div className="mt-12 space-y-4">
					<Link to="https://github.com" className="rounded-lg bg-black text-white px-4 py-3.5 flex items-center justify-center">
						<div className="flex items-center gap-2.5">
							<TbBrandGithubFilled />
							<span className="text-xs font-light">Github</span>
						</div>
						<FiArrowRight className="ms-auto" />
					</Link>
					<Link to="https://github.com" className="rounded-lg bg-red-500 text-white px-4 py-3.5 flex items-center justify-center">
						<div className="flex items-center gap-2.5">
							<IoLogoYoutube />
							<span className="text-xs font-light">Youtube</span>
						</div>
						<FiArrowRight className="ms-auto" />
					</Link>
					<Link to="https://linkedin.com" className="rounded-lg bg-blue-500 text-white px-4 py-3.5 flex items-center justify-center">
						<div className="flex items-center gap-2.5">
							<ImLinkedin />
							<span className="text-xs font-light">Linkedin</span>
						</div>
						<FiArrowRight className="ms-auto" />
					</Link>
				</div>
			</div>
		</div>
	);
};
