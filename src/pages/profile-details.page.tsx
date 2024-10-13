import { profileDetailsAtom, profileImageAtom } from "@/globalState/profileDetails.atom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Input, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { ChangeEvent, useRef, useState } from "react";
import { CircleStencil, Cropper, CropperRef, ImageRestriction } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { useForm } from "react-hook-form";
import { IoImageOutline } from "react-icons/io5";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/bmp"];

const ProfileDetailsFormSchema = z
	.object({
		firstName: z.string({ required_error: "You must provide a first name" }).min(1, { message: "You must provide a first name" }),
		lastName: z.string({ required_error: "You have to provide a last name also" }).min(1, { message: "You have to provide a last name also" }),
		email: z
			.string({ required_error: "You can't keep the email field empty" })
			.min(1, { message: "You can't keep the email field empty" })
			.regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Please provide a valid email address")
			.email({ message: "Please provide a valid email address" }),
	})
	.required();

type ProfileFormType = z.infer<typeof ProfileDetailsFormSchema>;

export const ProfileDetails = () => {
	const [profileImage, setProfileImage] = useAtom(profileImageAtom);
	const [profileDetails, setProfileDetails] = useAtom(profileDetailsAtom);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ProfileFormType>({
		resolver: zodResolver(ProfileDetailsFormSchema),
		mode: "onChange",
		defaultValues: {
			firstName: profileDetails?.firstName || "",
			lastName: profileDetails?.lastName || "",
			email: profileDetails?.email || "",
		},
	});

	const [fileError, setFileError] = useState("");
	const [uploadedFile, setUploadedFile] = useState<File | null | undefined>(null);
	const cropperRef = useRef<CropperRef>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState<string | null>(null);
	const [croppedImage, setCroppedImage] = useState<string>();
	const [croppedImageData, setCroppedImageData] = useState<string | ArrayBuffer | null | File>(null);

	const [popoverOpened, handlePopover] = useDisclosure();

	const newImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0];
		console.log(file);
		setUploadedFile(file);
		if (file) {
			if (file?.size > MAX_FILE_SIZE) {
				setFileError("Please try with a file of size below 2MB");
			} else if (!ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type)) {
				setFileError("Only PNG, JPG or BMP files are supported");
			} else {
				setCroppedImageData(null);
				setFileError("");
				// creating blob for the cropper
				const blob = URL.createObjectURL(file);
				setImage((prevBlob) => {
					prevBlob = blob;
					return prevBlob;
				});

				handlePopover.open();
				// Clear the event target value to give the possibility to upload the same image:
				event.target.value = "";
			}
		}
	};

	const saveCroppedImage = () => {
		if (cropperRef.current) {
			const croppedImageUrl = cropperRef.current.getCanvas()?.toDataURL();
			setCroppedImage(croppedImageUrl);
			setProfileImage(RESET);
			setProfileImage(croppedImageUrl);
		}

		// to save the data as blob in formData to send it through any api call.
		const canvas = cropperRef.current?.getCanvas();
		if (canvas) {
			const form = new FormData();
			canvas.toBlob((blob) => {
				if (blob) {
					form.append("file", blob, uploadedFile?.name);
					setCroppedImageData(form.get("file"));
				}
			}, "image/jpeg");
		}

		if (image) {
			URL.revokeObjectURL(image);
		}
		handlePopover.close();
	};

	const cancelCrop = () => {
		setImage(null);
		setCroppedImageData(null);
		if (image) {
			URL.revokeObjectURL(image);
		}
		handlePopover.close();
	};

	const onProfileDetailsSubmit = (data) => {
		// Handle form submission logic here
		if (data) {
			setProfileDetails(data);
		}
		console.log(croppedImageData);
	};

	return (
		<>
			<form action="" onSubmit={handleSubmit(onProfileDetailsSubmit)}>
				<div className="p-10">
					<h1 className="font-semibold text-3xl">Profile Details</h1>
					<p className="mt-3 text-muted">Add your details to create a personal touch to your profile.</p>

					<div className="bg-background-light rounded-lg p-5 lg:grid lg:grid-cols-8 items-center mt-12">
						<div className="col-span-3">
							<label htmlFor="" className="label">
								Profile Picture
							</label>
						</div>
						<div className="col-span-5 flex items-center gap-5">
							<div className="profileImageField">
								<input
									type="file"
									id="profileImg"
									className="fileInput"
									accept="image/png, image/jpeg, image/bmp"
									ref={fileInputRef}
									onChange={(e) => {
										if (e.target.files?.[0]) {
											newImageUpload(e);
										}
									}}
								/>
								<div className="text-white fileSelector" onClick={() => (fileInputRef.current ? fileInputRef.current?.click() : {})}>
									<IoImageOutline className="text-[30px]" />
									<span className="text-base mt-4">Change Image</span>
								</div>
								<Popover opened={popoverOpened}>
									<Popover.Target>
										<Avatar src={croppedImage ? croppedImage : profileImage || null} size={194} radius="lg" variant="filled" color="gray.6" />
									</Popover.Target>
									<Popover.Dropdown>
										<div className={`mt-4 ${image ? "w-[350px] bg-zinc-200" : ""} `}>
											<Cropper
												ref={cropperRef}
												src={image}
												stencilComponent={CircleStencil}
												className="upload-example__cropper"
												imageRestriction={ImageRestriction.fitArea}
											/>
										</div>

										<div className="flex mt-3 gap-3">
											<Button variant="outline" onClick={cancelCrop}>
												Cancel
											</Button>
											<Button onClick={saveCroppedImage}>Save</Button>
										</div>
									</Popover.Dropdown>
								</Popover>
							</div>
							<p className="text-muted-light text-sm font-medium">Image must be below 1024x1024px. Use PNG, JPG or BMP format.</p>
						</div>

						<div className="col-span-3"></div>
						<div className="col-span-5">
							<p className="text-red-500 text-sm mt-2">{fileError ? fileError : ""}</p>
						</div>
					</div>

					<div className="bg-background-light rounded-lg p-5 space-y-4 my-12">
						<div className="lg:grid lg:grid-cols-8 items-center">
							<div className="col-span-3">
								<label htmlFor="" className="label">
									First Name *
								</label>
							</div>
							<Input.Wrapper className="col-span-5" error={errors?.firstName ? errors?.firstName?.message : ""}>
								<Input type="text" size="md" {...register("firstName")} />
								{/* <Input.Error>{errors?.firstName ? errors?.firstName?.message : ""}</Input.Error> */}
							</Input.Wrapper>
						</div>
						<div className="lg:grid lg:grid-cols-8 items-center">
							<div className="col-span-3">
								<label htmlFor="" className="label">
									Last Name *
								</label>
							</div>
							<Input.Wrapper className="col-span-5" error={errors?.lastName ? errors?.lastName?.message : ""}>
								<Input type="text" size="md" {...register("lastName")} />
							</Input.Wrapper>
						</div>
						<div className="lg:grid lg:grid-cols-8 items-center">
							<div className="col-span-3">
								<label htmlFor="" className="label">
									Email
								</label>
							</div>
							<Input.Wrapper className="col-span-5" error={errors?.email ? errors?.email?.message : ""}>
								<Input type="email" size="md" {...register("email")} />
							</Input.Wrapper>
						</div>
					</div>
				</div>
				<div className="border-t border-gray-300 px-10 py-7 flex justify-end">
					<Button type="submit" size="lg">
						Save
					</Button>
				</div>
			</form>
		</>
	);
};
