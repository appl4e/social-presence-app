import { linksAtom } from "@/globalState/links.atom";
import { profileDetailsAtom, profileImageAtom } from "@/globalState/profileDetails.atom";
import { getPlatformColor } from "@/helper/platformColor";
import { Skeleton } from "@mantine/core";
import { useAtomValue } from "jotai";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { ImFacebook, ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { TbBrandGithubFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

export const PreviewContent = ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
	const profileImage = useAtomValue(profileImageAtom);
	const profileDetails = useAtomValue(profileDetailsAtom);
	const links = useAtomValue(linksAtom);

	const icons: Record<string, React.ReactNode> = {
		github: <TbBrandGithubFilled />,
		youtube: <IoLogoYoutube />,
		linkedin: <ImLinkedin />,
		facebook: <ImFacebook />,
	};
	return (
		<>
			{profileImage ? (
				<div className="rounded-full bg-muted border-[3px] border-primary size-[105px] overflow-hidden flex items-center justify-center mx-auto">
					<img src={profileImage} alt="Profile Pic" className="size-full" />
				</div>
			) : (
				<Skeleton height={105} width={105} radius={105} circle mx="auto" />
			)}

			{profileDetails ? (
				<>
					<h3 className="text-center mt-6 font-semibold text-xl">{profileDetails.firstName + " " + profileDetails.lastName}</h3>
					<p className="text-muted text-sm text-center mt-2">{profileDetails.email}</p>
				</>
			) : (
				<>
					<Skeleton height={28} width={115} mt={24} mx="auto" />
					<Skeleton height={10} width={140} mt={16} mx="auto" />
				</>
			)}

			<div className="mt-12 space-y-4">
				{links?.length
					? links.map((link, index) => (
							<Link
								to={link.link}
								key={index}
								className={`rounded-lg ${getPlatformColor(link.platform)} text-white px-4 py-3.5 flex items-center justify-center`}
							>
								<div className="flex items-center gap-2.5">
									{icons[link.platform]}
									<span className="text-xs font-light">{link.platform}</span>
								</div>
								<FiArrowRight className="ms-auto" />
							</Link>
					  ))
					: ""}
				{
					<>
						{showSkeleton
							? [...Array(links.length < 4 ? 4 - links.length : 0)]?.map((_, i) => <Skeleton height={44} width="100%" mt={16} mx="auto" key={i} />)
							: ""}
					</>
				}
			</div>
		</>
	);
};
