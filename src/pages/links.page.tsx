import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Input, Select, SelectProps } from "@mantine/core";
import { useFieldArray, useForm } from "react-hook-form";
import { FaLink, FaPlus } from "react-icons/fa";
import { HiMiniBars2 } from "react-icons/hi2";
import { ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { TbBrandGithubFilled } from "react-icons/tb";
import { z } from "zod";

const LinksValidationSchema = z.object({
	links: z
		.array(
			z
				.object({
					platform: z.string().min(1, { message: "You must choose a platform" }),
					link: z.string().min(1, { message: "A link must be provided" }).url({ message: "link must be a valid url" }),
				})
				.transform((data, ctx) => {
					const includes = data.link.includes(`${data.platform}.com`);
					if (!includes) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: `The link must be of ${data.platform}`,
							path: ["link"],
						});
						return z.NEVER;
					} else {
						return data;
					}
				})
		)
		.nonempty()
		.min(1, "At least one link is required"),
});

type LinksFormType = z.infer<typeof LinksValidationSchema>;

export const Links = () => {
	const icons: Record<string, React.ReactNode> = {
		github: <TbBrandGithubFilled />,
		youtube: <IoLogoYoutube />,
		linkedin: <ImLinkedin />,
	};

	const platformData = [
		{ value: "github", label: "Github" },
		{ value: "youtube", label: "Youtube" },
		{ value: "linkedin", label: "Linkedin" },
	];

	const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
		<Group flex="1" gap="xs">
			{icons[option.value]}
			{option.label}
		</Group>
	);

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
		control,
		setValue,
		clearErrors,
		watch,
	} = useForm<LinksFormType>({
		resolver: zodResolver(LinksValidationSchema),
		defaultValues: { links: [{ platform: "", link: "" }] },
	});

	const { fields, append, remove } = useFieldArray({
		name: "links",
		control,
	});

	const watchLinksArray = watch("links");
	const controlledLinksFields = fields.map((field, index) => {
		// console.log(field, watchLinksArray[index]);
		return {
			...field,
			...watchLinksArray[index],
		};
	});

	const onLinksSave = (data: LinksFormType) => {
		console.log(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onLinksSave)}>
				<div className="p-10">
					<h1 className="font-semibold text-3xl">Customize your links</h1>
					<p className="mt-3 text-muted">Add/edit/remove links below and then share all your profiles with the world!</p>

					<div className="mt-10">
						<Button variant="outline" size="lg" className="w-full" leftSection={<FaPlus />} onClick={() => append({ platform: "", link: "" })}>
							Add new link
						</Button>
					</div>
					{controlledLinksFields?.map((item, index) => (
						<div className="bg-background rounded-lg p-5 mt-6 space-y-3" key={item.id}>
							<div className="flex items-center">
								<Button variant="transparent" color="muted" className="flex items-center cursor-pointer" leftSection={<HiMiniBars2 />}>
									Link #{index + 1}
								</Button>
								{index < 1 ? (
									""
								) : (
									<Button variant="transparent" color="muted" className="ms-auto" classNames={{ label: "font-normal" }} onClick={() => remove(index)}>
										Remove
									</Button>
								)}
							</div>
							<Select
								label="Platform"
								size="lg"
								value={item.platform}
								placeholder="Select your platform"
								leftSection={icons[item.platform]}
								data={platformData}
								renderOption={renderSelectOption}
								{...register(`links.${index}.platform`, { required: true })}
								onChange={(value) => {
									setValue(`links.${index}.platform`, value || "");
									if (value) {
										clearErrors(`links.${index}.platform`);
									}
								}}
								error={errors?.links?.length ? errors?.links[index]?.platform?.message : ""}
								classNames={{
									error: "text-sm",
								}}
							/>

							<Input.Wrapper label="Link" error={errors?.links?.length ? errors?.links[index]?.link?.message : ""}>
								<Input type="text" size="lg" {...register(`links.${index}.link`, { required: true })} leftSection={<FaLink />} />
							</Input.Wrapper>
						</div>
					))}

					<Input.Error>{errors?.links?.message}</Input.Error>

					{/* <div className="bg-background rounded-lg p-5 mt-6 space-y-3">
					<div className="flex items-center">
						<Button variant="transparent" color="muted" className="flex items-center cursor-pointer" leftSection={<HiMiniBars2 />}>
							Link #2
						</Button>
						<Button variant="transparent" color="muted" className="ms-auto" classNames={{ label: "font-normal" }}>
							Remove
						</Button>
					</div>
					<Select
						label="Platform"
						size="lg"
						value="youtube"
						placeholder="Select your platform"
						leftSection={icons["youtube"]}
						data={platformData}
						renderOption={renderSelectOption}
					/>

					<Input.Wrapper label="Link">
						<Input type="text" size="lg" leftSection={<FaLink />} />
					</Input.Wrapper>
				</div> */}
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
