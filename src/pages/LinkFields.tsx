import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Group, Input, Select, SelectProps } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { FaLink } from "react-icons/fa";
import { HiMiniBars2 } from "react-icons/hi2";
import { ImFacebook, ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { TbBrandGithubFilled } from "react-icons/tb";
import { LinksFormType } from "./links.page";

export const LinkFields = ({ id, index, remove, item }) => {
	const {
		register,
		formState: { errors },
		setValue,
		clearErrors,
	} = useFormContext<LinksFormType>();

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const platformData = [
		{ value: "github", label: "Github" },
		{ value: "youtube", label: "Youtube" },
		{ value: "linkedin", label: "Linkedin" },
		{ value: "facebook", label: "Facebook" },
	];

	const icons: Record<string, React.ReactNode> = {
		github: <TbBrandGithubFilled />,
		youtube: <IoLogoYoutube />,
		linkedin: <ImLinkedin />,
		facebook: <ImFacebook />,
	};

	const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
		<Group flex="1" gap="xs">
			{icons[option.value]}
			{option.label}
		</Group>
	);

	return (
		<div className="bg-background rounded-lg p-5 mt-6 space-y-3" ref={setNodeRef} style={style} {...attributes}>
			<div className="flex items-center">
				<Button variant="transparent" color="muted" className="flex items-center cursor-move" leftSection={<HiMiniBars2 />} {...listeners}>
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
					root: "relative",
					error: "text-sm",
				}}
			/>

			<Input.Wrapper label="Link" error={errors?.links?.length ? errors?.links[index]?.link?.message : ""}>
				<Input type="text" size="lg" {...register(`links.${index}.link`, { required: true })} leftSection={<FaLink />} />
			</Input.Wrapper>
		</div>
	);
};
