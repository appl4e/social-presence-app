import { linksAtom } from "@/globalState/links.atom";
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { z } from "zod";
import { LinkFields } from "./LinkFields";

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

export type LinksFormType = z.infer<typeof LinksValidationSchema>;

export const Links = () => {
	const [links, saveLinks] = useAtom(linksAtom);
	const LinksFormMethods = useForm<LinksFormType>({
		resolver: zodResolver(LinksValidationSchema),
		defaultValues: { links: [{ platform: "", link: "" }] },
	});

	const { control, watch } = LinksFormMethods;

	const { fields, append, remove, swap, replace } = useFieldArray({
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

	useEffect(() => {
		if (links.length > 0) {
			// update(controlledLinksFields, (links) => {
			// 	links.forEach((item, index) => {
			// 		links[index] = { ...item, ...links[index].toString() };
			// 	});
			// });

			// LinksFormMethods.setValue("links", [...links]);
			replace(links);
		}
	}, [links]);

	const sensors = useSensors(
		useSensor(MouseSensor, {
			// Require the mouse to move by 10 pixels before activating
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(TouchSensor, {
			// Press delay of 250ms, with tolerance of 5px of movement
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		})
	);

	const onLinksSave = (data: LinksFormType) => {
		console.log(data);
		saveLinks(data.links);
	};

	function handleDragEnd(event) {
		const { active, over } = event;

		if (active.id !== over.id) {
			const oldIndex = controlledLinksFields.findIndex((item) => item.id == active.id);
			const newIndex = controlledLinksFields.findIndex((item) => item.id == over.id);

			swap(newIndex, oldIndex);
		}
	}

	return (
		<>
			<FormProvider {...LinksFormMethods}>
				<form onSubmit={LinksFormMethods.handleSubmit(onLinksSave)}>
					<div className="p-10">
						<h1 className="font-semibold text-3xl">Customize your links</h1>
						<p className="mt-3 text-muted">Add/edit/remove links below and then share all your profiles with the world!</p>

						<div className="mt-10">
							<Button variant="outline" size="lg" className="w-full" leftSection={<FaPlus />} onClick={() => append({ platform: "", link: "" })}>
								Add new link
							</Button>
						</div>
						<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
							<SortableContext items={controlledLinksFields} strategy={verticalListSortingStrategy}>
								{controlledLinksFields?.map((item, index) => (
									<LinkFields id={item.id} index={index} item={item} remove={remove} key={item.id} />
								))}
							</SortableContext>
						</DndContext>
					</div>
					<div className="border-t border-gray-300 px-10 py-7 flex justify-end">
						<Button type="submit" size="lg">
							Save
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};
