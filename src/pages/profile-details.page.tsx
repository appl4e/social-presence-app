import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Input } from "@mantine/core";
import { useRef, useState } from "react";
import { CircleStencil, Cropper, CropperRef, ImageRestriction } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { useForm } from "react-hook-form";
import { IoImageOutline } from "react-icons/io5";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 8 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/bmp"];

const ProfileDetailsFormSchema = z
	.object({
		profileImg: z
			.any()
			.optional()
			.refine((files) => {
				return files?.size <= MAX_FILE_SIZE;
			}, `Max image size is 5MB.`)
			.refine((files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type), "Only PNG, JPG and BMP formats are supported."),
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
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		clearErrors,
		watch,
	} = useForm<ProfileFormType>({
		resolver: zodResolver(ProfileDetailsFormSchema),
		mode: "onChange",
	});

	const [croppedLogo, setCroppedLogo] = useState<string | ArrayBuffer | null | File>(null);
	const [image, setImage] = useState<string | null>(null);
	const cropperRef = useRef<CropperRef>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const newImageUpload = (file) => {
		if (file) {
			// setFile(value);
			setCroppedLogo(null);
			console.log(file);
			const blob = URL.createObjectURL(file);

			setImage(blob);
		}
		// setFile(null);
	};

	const closeModal = () => {
		setValue("profileImg", null, { shouldValidate: true });
		setImage(null);
		setCroppedLogo(null);
		clearErrors();
	};

	// on image crop
	const onUpdate = () => {
		const canvas = cropperRef.current?.getCanvas();
		if (canvas) {
			const form = new FormData();
			canvas.toBlob((blob) => {
				if (blob) {
					form.append("file", blob, watch("profileImg").name);
					setCroppedLogo(form.get("file"));
				}
			}, "image/jpeg");
		}
	};

	const onProfileDetailsSubmit = (data) => {
		// Handle form submission logic here
		console.log(data);
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
									{...register("profileImg")}
									ref={fileInputRef}
									onChange={(e) => {
										if (e.target.files?.[0]) {
											console.log(e.target.files);
											newImageUpload(e.target.files?.[0]);
											setValue("profileImg", e.target.files[0], { shouldValidate: true });
										}
									}}
								/>
								<div className="text-white fileSelector" onClick={() => fileInputRef.current?.click()}>
									<IoImageOutline className="text-[30px]" />
									<span className="text-base mt-4">Change Image</span>
								</div>
								<Avatar src={null} size={194} radius="lg" variant="filled" color="gray.6" />
							</div>
							<p className="text-muted-light text-sm font-medium">Image must be below 1024x1024px. Use PNG, JPG or BMP format.</p>
						</div>
						{croppedLogo ? (
							""
						) : image ? (
							<>
								<div className="col-span-3"></div>
								<div className="col-span-5">
									<div className={`mt-4 ${image ? "h-[350px] bg-zinc-200" : ""} `}>
										<Cropper
											ref={cropperRef}
											src={image}
											stencilComponent={CircleStencil}
											className="upload-example__cropper"
											imageRestriction={ImageRestriction.fitArea}
											onUpdate={onUpdate}
										/>
									</div>
								</div>
							</>
						) : (
							""
						)}
						<div className="col-span-3"></div>
						<div className="col-span-5">
							{/* <div className={`mt-4 ${image ? "h-[350px] bg-zinc-200" : ""} `}>
								<Cropper
									ref={cropperRef}
									src={image}
									stencilComponent={CircleStencil}
									className="upload-example__cropper"
									imageRestriction={ImageRestriction.fitArea}
									onUpdate={onUpdate}
								/>
							</div> */}
							<p className="text-red-500 text-sm mt-2">{errors?.profileImg ? errors?.profileImg?.message?.toString() : ""}</p>
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
