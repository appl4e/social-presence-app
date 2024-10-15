import { Button, CopyButton, Modal } from "@mantine/core";
import { PreviewContent } from "./PreviewContent";

export const PreviewModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
	return (
		<Modal.Root opened={isOpen} onClose={onClose} fullScreen radius={0} transitionProps={{ transition: "fade-down", duration: 600 }} centered>
			<Modal.Content>
				<Modal.Body>
					<header className="bg-primary p-6 rounded-es-[30px] rounded-ee-[30px] h-[350px]">
						<div className="flex items-center bg-white rounded-lg p-4 shadow-sm">
							<Button type="button" variant="outline" size="md" className="" onClick={onClose}>
								Back to Editor
							</Button>
							<CopyButton value="https://social-presence.vercel.app/">
								{({ copied, copy }) => (
									<Button type="button" variant="fill" size="md" className="ms-auto" onClick={copy}>
										{copied ? "Link copied" : "Share Link"}
									</Button>
								)}
							</CopyButton>
						</div>
					</header>
					<div className="bg-white shadow-lg rounded-[20px] w-[350px] px-[50px] pt-10 pb-12 mx-auto -mt-[150px]">
						<PreviewContent />
					</div>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
};
