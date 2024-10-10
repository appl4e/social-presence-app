import { Avatar, Button, Input } from "@mantine/core";

export const ProfileDetails = () => {
	return (
		<>
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
						<Avatar src={null} size={194} radius="lg" variant="filled" color="gray.6"></Avatar>
						<p className="text-muted-light text-sm font-medium">Image must be below 1024x1024px. Use PNG, JPG or BMP format.</p>
					</div>
				</div>

				<div className="bg-background-light rounded-lg p-5 space-y-4 my-12">
					<div className="lg:grid lg:grid-cols-8 items-center">
						<div className="col-span-3">
							<label htmlFor="" className="label">
								First Name *
							</label>
						</div>
						<div className="col-span-5">
							<Input type="text" size="md" />
						</div>
					</div>
					<div className="lg:grid lg:grid-cols-8 items-center">
						<div className="col-span-3">
							<label htmlFor="" className="label">
								Last Name *
							</label>
						</div>
						<div className="col-span-5">
							<Input type="text" size="md" />
						</div>
					</div>
					<div className="lg:grid lg:grid-cols-8 items-center">
						<div className="col-span-3">
							<label htmlFor="" className="label">
								Email
							</label>
						</div>
						<div className="col-span-5">
							<Input type="email" size="md" />
						</div>
					</div>
				</div>
			</div>
			<div className="border-t border-gray-300 px-10 py-7 flex justify-end">
				<Button size="lg">Save</Button>
			</div>
		</>
	);
};
